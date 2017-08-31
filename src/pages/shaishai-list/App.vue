<template>
  <div>
    <div class="tab-container">
      <tab :style="{ width: (tagList.length + 2) * 2 + 'rem', 'min-width': '100%' }" :custom-bar-width="getBarWidth" :line-width="3" v-model="tabIndex">
        <tab-item selected>最新</tab-item>
        <tab-item>关注</tab-item>
        <template v-if="tagList && tagList.length">
          <tab-item v-for="(tag, index) in tagList"
            :key="index"
          >{{ tag.name }}</tab-item>
        </template>
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
        <template v-if="showList.length">
          <list-item v-for="item in showList"
            :key="item.ID"
            :data="item"
          ></list-item>
        </template>

        <!-- no data -->
        <div class="no_more_data" v-else>
          暂无数据
        </div>

        <!-- no more data -->
        <div class="no_more_data" v-if="listAllLoaded">
          暂无更多数据
        </div>
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

/* mock data */
// import MockTags from '../../mockdata/bask_tags.json'

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
      currentPage: 1,
      tagList: []
    }
  },
  computed: {
    showList () {
      // TODO sort data list formally
      switch (this.tabIndex) {
        case 0:
        case 1:
          // return this.dataList.filter((el, i) => {
          //   return i % 2
          // })
          return this.dataList
        default:
          return this.dataList.filter((el, i) => {
            const firstTagStr = el.firstTagStr
            if (!firstTagStr) {
              return false
            }
            const tagNameOfTab = this.tagList[this.tabIndex - 2].name
            return firstTagStr.indexOf(tagNameOfTab) !== -1
          })
      }
    }
  },
  methods: {
    handleTopChange (status) {
      this.topStatus = status
    },

    listLoadTop () {
      this.$http.get('/bask/listByPublish', {
        params: {
          firstTags: '',
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
      this.$http.get('/bask/listByPublish', {
        params: {
          firstTags: '',
          pageIndex: this.currentPage
        }
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
    },

    getBarWidth () {
      return '1rem'
    }
  },

  created () {
    if (this.dataList.length) {
      return
    }

    /* tags */
    // setTimeout(() => {
    //   this.tagList = MockTags
    // }, 200)
    this.$http.get(window.BaskTagsUrl || '/getBaskTags')
      .then(res => {
        console.log(res)
        this.tagList = JSON.parse(res)
      })
      .catch(err => {
        console.log('------------- err -------------', err)
      })

    this.$http.get('/bask/lisNewtByPublish', {
      params: {
        firstTags: ''
      }
    })
      .then(res => {
        if (res.resultCode === 200) {
          this.dataList = res.object
          this.currentPage++
        }
      })
      .catch(err => {
        console.log('------------- err -------------', err)
      })
    this.$http.get('/bask/lisNewtByPublish', {
      params: {
        firstTags: ''
      }
    })
      .then(res => {
        if (res.resultCode === 200) {
          this.dataList = res.object
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
