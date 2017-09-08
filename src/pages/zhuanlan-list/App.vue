<template>
  <div class="zl_list">
    <mt-loadmore
      :autoFill="false"
      :top-method="listLoadTop"
      @top-status-change="handleTopChange"
      :bottom-method="listLoadBottom"
      :bottom-all-loaded="listAllLoaded"
      ref="loadmoreItems"
    >
      <!-- top content -->
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'pull'">下拉刷新</span>
        <span v-show="topStatus === 'drop'">释放刷新</span>
        <span v-show="topStatus === 'loading'" class="loading"></span>
      </div>

      <!-- zhuanlan list -->
      <list-item v-for="item in dataList"
        :key="item.ID"
        :id="item.ID"
        :title="item.title"
        :official="item.official"
        :date="item.createDate"
        :viewCount="item.viewCount"
        :imgUrl="item.photoUrl"
        :url="item.url"
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
import ListItem from '../../components/zhuanlan-list-item.vue'

export default {
  name: 'app',
  data () {
    return {
      dataList: [],
      listAllLoaded: false,
      topStatus: '',
      currentPage: 1,
      requestUrl: '/official/listByPublish'
    }
  },
  computed: {
    params () {
      let params = {}
      params.pageIndex = this.currentPage
      params.pageSize = 5
      params.userID = 'all'
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

    /* wechat */
    this.$wechat.ready(() => {
      // share info
      let shareData = {
        title: '老子问问 - 专栏', // 分享标题
        link: window.wx_shareUrl, // 分享链接
        imgUrl: window.logo, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      }
      // to timeline
      this.$wechat.onMenuShareTimeline(shareData)

      // to friend
      shareData.desc = '老子问问 - 专栏列表'
      this.$wechat.onMenuShareAppMessage(shareData)
    })
  },
  components: {
    'list-item': ListItem,
    'mt-loadmore': Loadmore
  }
}
</script>

<style>
  .zl_list {
    width:auto;
    overflow: hidden;
    padding: 0.3rem 0.25rem;
  }

  .mint-loadmore-top,
  .mint-loadmore-bottom {
    font-size: 12px !important;
  }
</style>
