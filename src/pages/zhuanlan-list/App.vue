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
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :official="item.official"
        :date="item.date"
        :viewCount="item.viewCount"
        :imgUrl="item.imgUrl"
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
import MockData from '../../mockdata/zhuanlan-list'

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
      setTimeout(() => {
        this.dataList = MockData
        this.$refs.loadmoreItems.onTopLoaded()
      }, 500)
      // this.$http.get('/official/listByPublish', {
      //   params: {
      //     pageIndex: 1
      //   }
      // })
      //   .then(res => {
      //     if (res.resultCode === 200) {
      //       this.dataList = res.object
      //       this.currentPage = 2
      //       this.listAllLoaded = false
      //     }
      //     this.$refs.loadmoreItems.onTopLoaded()
      //   })
      //   .catch(err => {
      //     console.log('err', err)
      //     this.$refs.loadmoreItems.onTopLoaded()
      //   })
    },

    listLoadBottom () {
      setTimeout(() => {
        this.dataList = this.dataList.concat(MockData)
        this.$refs.loadmoreItems.onBottomLoaded()
      }, 500)
      // this.$http.get('/official/listByPublish', {
      //   params: {
      //     pageIndex: this.currentPage
      //   }
      // })
      //   .then(res => {
      //     if (res.resultCode === 200) {
      //       if (res.object.length > 0) {
      //         this.dataList = this.dataList.concat(res.object)
      //         this.currentPage++
      //       } else {
      //         this.listAllLoaded = true
      //       }
      //     }
      //     this.$refs.loadmoreItems.onBottomLoaded()
      //   })
      //   .catch(err => {
      //     console.log('err', err)
      //     this.$refs.loadmoreItems.onBottomLoaded()
      //   })
    }
  },
  created () {
    this.dataList = MockData
    // this.$http.get('/official/listByPublish', {
    //   params: {
    //     pageIndex: 1
    //   }
    // })
    //   .then(res => {
    //     if (res.resultCode === 200) {
    //       this.dataList = res.object
    //       this.currentPage++
    //       if (res.object.length === 0) {
    //         this.listAllLoaded = true
    //       }
    //     }
    //   })
    //   .catch(err => {
    //     console.log('------------- err -------------', err)
    //   })
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
