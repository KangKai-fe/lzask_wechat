<template>
  <div class="chat-banner01">
    <img :src="llInfo.picUrl" :alt="llInfo.picFileName">
    <div class="chatB_title01">
      <h3>{{ llInfo.title }}</h3>
      <status
        :publishDate="llInfo.publishDate"
        :discussCount="llInfo.discussCount"
        :hotCount="llInfo.hotCount"
      ></status>
    </div>
  </div>
  </div>
</template>

<script>
import LLStatus from './liaoliao-status.vue'

export default {
  name: 'll-detail',
  props: ['llInfo'],
  components: {
    'status': LLStatus
  }
}
</script>

<style scoped>
.chat-banner01 {
  width: 100%;
  overflow: hidden;
}

.chat-banner01 img {
  display: block;
  width: 100%;
}

.chatB_title01 {
  width: auto;
  padding: 0 0.3rem;
}

.chatB_title01 h3 {
  font-size: 0.36rem;
  line-height: 0.48rem;
  padding: 0.3rem 0;
}
</style>
