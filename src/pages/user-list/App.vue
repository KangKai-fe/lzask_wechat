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
      <list-item v-for="user in dataList"
        :key="user.ID"
        :userID="user.ID"
        :userName="user.showName"
        :userIdentity="user.summary"
        :schoolGrade="user.univName && user.grade && (user.univName + user.grade)"
        :followCount="user.followCount"
        :photo="user.photo"
        :followStatus="user.followStatus"
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

/* tools */
import { querystring } from 'vux'

/* custom component */
import User from '../../components/user-info-brief.vue'

export default {
  name: 'user',
  data () {
    return {
      dataList: [],
      listAllLoaded: false,
      topStatus: '',
      currentPage: 1,
      requestUrl: '',
      newUserType: 1
    }
  },
  computed: {
    params () {
      let params = {}
      params.pageIndex = this.currentPage
      params.type = this.newUserType
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
            this.currentPage++
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
    let pageTitle
    const type = querystring.parse().type
    switch (type) {
      case 'hot':
        pageTitle = '热门用户'
        this.requestUrl = '/userInfo/listHotUser'
        break
      case 'new':
        pageTitle = '新晋用户'
        this.requestUrl = '/userInfo/listNewUser'
        this.newUserType = 1
        break
      default:
        pageTitle = '用户'
        document.title = pageTitle
        return
    }
    document.title = pageTitle

    this.currentPage = 1
    this.$http.get(this.requestUrl, {
      params: this.params
    })
      .then(res => {
        if (res.resultCode === 200) {
          this.dataList = res.object
          this.currentPage++
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
    'list-item': User,
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
