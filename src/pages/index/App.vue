<template>
  <div id="app">
    <template-link v-for="(page, index) in pageList"
      :key="index"
      :pageTitle="page.title"
      :pageName="page.name"
    ></template-link>
  </div>
</template>

<script>
import Link from '../../components/template-link.vue'

export default {
  name: 'app',
  data () {
    return {
      pageList: [
        {
          title: '晒晒列表页',
          name: 'shaishai-list'
        },
        {
          title: '聊聊列表页',
          name: 'liaoliao-list'
        },
        {
          title: '问问列表页',
          name: 'wenwen-list'
        },
        {
          title: '专栏列表页',
          name: 'zhuanlan-list'
        },
        {
          title: '讲讲列表页',
          name: 'jiangjiang-list'
        }
      ]
    }
  },
  components: {
    'template-link': Link
  }
}
</script>

<style>
  body {
    width: 100%;
    margin: 0;
  }
  #app {
    margin-top: 100px;
  }
  #app p {
    margin: 20px 0;
    text-align: center;
  }
</style>
