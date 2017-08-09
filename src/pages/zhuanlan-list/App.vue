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

    </mt-loadmore>
  </div>
</template>

<script>
/* mint ui loadmore */
import { Loadmore } from 'mint-ui'

/* custom component */
import ListItem from '../../components/zhuanlan-list-item.vue'

/* mock data */
import dataList from '../../mockdata/zhuanlan-list'

export default {
  name: 'app',
  data () {
    return {
      dataList,
      selected: 'subtab_msg',
      listAllLoaded: false,
      topStatus: ''
    }
  },
  methods: {
    handleTopChange (status) {
      this.topStatus = status
    },

    listLoadTop () {
      const firstItemId = this.dataList[0].id
      setTimeout(() => {
        for (let i = firstItemId; i > firstItemId - 5; i--) {
          this.dataList.unshift({ id: i - 1 })
        }
        this.$refs.loadmoreItems.onTopLoaded()
      }, 1000)
    },

    listLoadBottom () {
      this.$http.get('/static/api/zhuanlanList.json')
        .then(res => {
          let resData = JSON.parse(JSON.stringify(res))
          console.log(resData)
          if (resData.success) {
            this.dataList = this.dataList.concat(resData.dataList)
          }
          this.$refs.loadmoreItems.onBottomLoaded()
        })
        .catch(err => {
          console.log('err', err)
          this.$refs.loadmoreItems.onBottomLoaded()
        })
    }
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
