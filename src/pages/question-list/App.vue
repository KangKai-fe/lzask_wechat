<template>
  <div>
    <mt-loadmore
      :autoFill="false"
      :top-method="listLoadTop"
      @top-status-change="handleTopChange"
      :bottom-method="listLoadBottom"
      :bottom-all-loaded="listAllLoaded"
      ref="loadmoreItems"
    >
      <!-- user info -->
      <list-item v-for="question in dataList"
        :key="question.questionID"
        :questionInfo="question"
      ></list-item>

      <!-- no more data -->
      <div class="no_more_data" v-if="listAllLoaded">
        暂无更多数据
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
/* mint ui loadmore */
import { Loadmore } from 'mint-ui'

/* custom component */
import Question from '../../components/wenwen-hot-question.vue'

export default {
  name: 'user',
  data () {
    return {
      dataList: [],
      listAllLoaded: false,
      topStatus: '',
      currentPage: 1,
      requestUrl: '/question/listQuestion'
    }
  },
  computed: {
    params () {
      let params = {}
      params.pageIndex = this.currentPage
      params.userID = 'all' // 提问者的ID
      params.appointID = '' // 指定回答者的ID
      params.publishFlag = 1 // 是否公开  0否  1是
      params.orderType = 1 // 排序方式  0创建日期降序  1浏览次数降序
      params.status = 3 // 问题状态：0删除、1禁用、2正常（未回答）,3已回答  4逾期未答,5提问未支付,6拒绝回答
      params.currentUserID = this.$http.userID
      return params
    }
  },
  methods: {
    handleTopChange (status) {
      this.topStatus = status
    },

    listLoadTop () {
      this.currentPage = 1
      this.$http.get(this.requestUrl, {
        params: this.params
      })
        .then(res => {
          if (res.resultCode === 200) {
            this.dataList = res.object
            this.currentPage = 2
            this.listAllLoaded = false
          }
          this.$refs.loadmoreItems.onTopLoaded()
        })
        .catch(err => {
          console.log('err', err)
          this.$refs.loadmoreItems.onTopLoaded()
        })
    },

    listLoadBottom () {
      this.$http.get(this.requestUrl, {
        params: this.params
      })
        .then(res => {
          if (res.resultCode === 200) {
            if (res.object.length > 0) {
              this.dataList = this.dataList.concat(res.object)
              this.currentPage++
            } else {
              this.listAllLoaded = true
            }
          }
          this.$refs.loadmoreItems.onBottomLoaded()
        })
        .catch(err => {
          console.log('err', err)
          this.$refs.loadmoreItems.onBottomLoaded()
        })
    }
  },

  created () {
    if (this.dataList.length) {
      return
    }

    this.currentPage = 1
    this.$http.get(this.requestUrl, {
      params: this.params
    })
      .then(res => {
        if (res.resultCode === 200) {
          this.dataList = res.object
          this.currentPage++
          console.log(res.object.length)
          if (res.object.length === 0) {
            this.listAllLoaded = true
          }
        }
      })
      .catch(err => {
        console.log('------------- err -------------', err)
      })
  },

  components: {
    'list-item': Question,
    'mt-loadmore': Loadmore
  }
}
</script>

<style>
.tab-container {
  width: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}

.tab-swiper {
  background: #fff;
}

.mint-loadmore-top,
.mint-loadmore-bottom {
  font-size: 12px !important;
}
</style>
