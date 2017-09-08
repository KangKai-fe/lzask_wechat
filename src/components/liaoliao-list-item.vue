<template>
  <div @click="checkDetail">
    <div class="current-day">
      <div class="img01">
        <a href="javascript: void(0);">
          <img :src="data.picUrl" :alt="data.picFileName">
        </a>
        <status
          :publishDate="data.publishDate"
          :discussCount="data.discussCount"
          :hotCount="data.hotCount"
          :white="true"
        ></status>
        <span v-if="data.status === 2" class="over">
          <strong>已结束</strong>
        </span>
      </div>
      <h3>{{ data.title }}</h3>
    </div>
  </div>
</template>

<script>
import LLStatus from './liaoliao-status.vue'

export default {
  name: 'll-list-item',
  props: ['data'],

  computed: {
  },

  methods: {
    checkDetail () {
      console.log(this.data.ID)
      // location.href = '/liaoliao-detail.html?topicID=' + this.data.ID
      location.href = window.detailPathPrefix + '/liaoliao-detail?topicID=' + this.data.ID
    }
  },

  components: {
    'status': LLStatus
  }
}
</script>

<style scoped>
.current-day {
  position: relative;
  padding: 0.3rem 0.25rem 0;
  border-bottom: 0.01rem solid #ccc;
}

.current-day .img01 {
  width: 100%;
  overflow: hidden;
  border-radius: 0.1rem;
  display: block;
  position: relative;
}

.current-day h3 {
  font-size: 0.32rem;
  line-height: 0.44rem;
  padding: 0.27em 0 0.45rem;
}

.over {
  width: 1rem;
  height: 0.4rem;
  line-height: 0.4rem;
  text-align: center;
  color: #fff;
  font-size: 0.32rem;
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
  display: block;
}

.over strong {
  position: relative;
  z-index: 2;
  color: #fff;
  font-size: 0.24rem;
  line-height: 0.435rem;
  display: block;
  height: 0.4rem;
}

.over:before {
  content: '';
  width: 1rem;
  height: 0.4rem;
  background-color: #80aedc;
  opacity: 0.7;
  width: 100%;
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  border-radius: 0.1rem;
  overflow: hidden;
}
</style>
