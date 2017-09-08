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

      <!-- liaoliao list -->
      <list-item v-for="item in dataList"
        :key="item.id"
        :data="item"
      ></list-item>

    </mt-loadmore>
  </div>
</template>

<script>
/* mint ui loadmore */
import { Loadmore } from 'mint-ui'

/* custom component */
import ListItem from '../../components/liaoliao-list-item.vue'

export default {
  name: 'app',
  data () {
    return {
      dataList: [],
      listAllLoaded: false,
      topStatus: '',
      currentPage: 1
    }
  },
  methods: {
    handleTopChange (status) {
      this.topStatus = status
    },

    listLoadTop () {
      this.$http.get('/topic/listHistory', {
        params: {
          pageIndex: 1
        }
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
      this.$http.get('/topic/listHistory', {
        params: {
          pageIndex: this.currentPage
        }
      })
        .then(res => {
          if (res.object.length > 0) {
            this.dataList = this.dataList.concat(res.object)
            this.currentPage++
          } else {
            this.listAllLoaded = true
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
    this.$http.get('/topic/listByPublish')
      .then(res => {
        if (res.resultCode === 200) {
          this.dataList = res.object.concat(this.dataList)
        }
      })
      .catch(err => {
        console.log('------------- err -------------', err)
      })

    this.$http.get('/topic/listHistory', {
      params: {
        pageIndex: 1
      }
    })
      .then(res => {
        if (res.resultCode === 200) {
          this.dataList = this.dataList.concat(res.object)
          this.currentPage++
        }
      })
      .catch(err => {
        console.log('------------- err -------------', err)
      })

    /* wechat */
    this.$wechat.ready(() => {
      window.addEventListener('popstate', () => {
        this.$wechat.closeWindow()
      }, false)

      // share info
      let shareData = {
        title: '老子问问 - 聊聊', // 分享标题
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
      shareData.desc = '老子问问 - 讲讲列表'
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
