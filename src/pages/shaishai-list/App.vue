<template>
  <div>
    <div class="tab-container">
      <tab style="width: 14rem;" :custom-bar-width="getBarWidth" :line-width="3" v-model="tabIndex">
        <tab-item selected>最新</tab-item>
        <tab-item>关注</tab-item>
        <tab-item>艺术</tab-item>
        <tab-item>设计</tab-item>
        <tab-item>趣味</tab-item>
        <tab-item>生活</tab-item>
        <tab-item>学习</tab-item>
      </tab>
    </div>
    <div class="main-container">
      <mt-loadmore
        :autoFill="false"
        :top-method="listLoadTop"
        @top-status-change="handleTopChange"
        :bottom-method="listLoadBottom"
        :bottom-all-loaded="listAllLoaded"
        ref="loadmoreItems"
      >

        <list-item v-for="item in showList"
          :key="item.ID"
          :data="item"
        ></list-item>

      </mt-loadmore>
    </div>
  </div>
</template>

<script>
/* mint ui loadmore */
import { Loadmore } from 'mint-ui'

/* vux */
import { Tab, TabItem } from 'vux'

/* custom component */
import ListItem from '../../components/shaishai-list-item.vue'

export default {
  name: 'app',
  data () {
    return {
      tabIndex: 0,
      dataList: [],
      selected: 'subtab_msg',
      listAllLoaded: false,
      topStatus: '',
      pageSize: 5,
      currentPage: 1
    }
  },
  computed: {
    showList () {
      // TODO sort data list formally
      switch (this.tabIndex) {
        case 0:
          return this.dataList
        case 1:
          return this.dataList.filter((el, i) => {
            return i % 2
          })
        case 2:
          return this.dataList.filter((el, i) => {
            return i % 3
          })
        default:
          return this.dataList
      }
    }
  },
  methods: {
    handleTopChange (status) {
      this.topStatus = status
    },

    listLoadTop () {
      this.$http.get('/static/api/bask/listByPublish.json', {
        params: {
          pageSize: this.pageSize,
          pageIndex: 1
        }
      })
        .then(res => {
          let resData = JSON.parse(JSON.stringify(res))
          console.log(resData)
          if (resData.resultCode === 200) {
            this.dataList = resData.object
            this.currentPage = 1
          }
          this.$refs.loadmoreItems.onBottomLoaded()
        })
        .catch(err => {
          console.log('err', err)
          this.$refs.loadmoreItems.onBottomLoaded()
        })
    },

    listLoadBottom () {
      this.$http.get('/static/api/bask/listByPublish.json', {
        params: {
          pageSize: this.pageSize,
          pageIndex: this.currentPage
        }
      })
        .then(res => {
          let resData = JSON.parse(JSON.stringify(res))
          console.log(resData)
          if (resData.resultCode === 200) {
            this.dataList = this.dataList.concat(resData.object)
            this.currentPage++
          }
          this.$refs.loadmoreItems.onBottomLoaded()
        })
        .catch(err => {
          console.log('err', err)
          this.$refs.loadmoreItems.onBottomLoaded()
        })
    },

    getBarWidth () {
      return '1rem'
    }
  },

  created () {
    if (this.dataList.length) {
      return
    }
    this.$http.get('/static/api/bask/listByPublish.json', {
    // this.$http.get('/salt/salt2rice/bask/lisNewtByPublish', {
      params: {
        pageSize: this.pageSize,
        pageIndex: this.currentPage
      }
    })
      .then(res => {
        let resData = JSON.parse(JSON.stringify(res))
        console.log('-------------', resData)
        if (resData.resultCode === 200) {
          this.dataList = resData.object
          this.currentPage++
        }
      })
      .catch(err => {
        console.log('------------- err -------------', err)
      })
  },

  components: {
    'list-item': ListItem,
    'mt-loadmore': Loadmore,
    Tab,
    TabItem
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
