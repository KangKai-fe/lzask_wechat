<template>
  <div class="comment">
    <user
      :showName="comment.userInfo.showName"
      :photo="comment.userInfo.photo"
    ></user>
    <div v-if="comment.content" class="c-word01">{{ comment.content }}</div>
    <voice v-else-if="comment.fileName && comment.soundTime"
      :url="comment.fileName"
      :soundTime="comment.soundTime"
    ></voice>
    <status class="ll_status"
      :createDate="comment.createDate"
      :viewCount="comment.viewCount"
      :zanCount="comment.zanCount"
      :zanStatus="comment.zanStatus"
    ></status>
  </div>
</template>

<script>
import CommentUser from './comment-user.vue'
import SSStatus from './shaishai-status.vue'
import VoiceMsg from './shaishai-voice-msg.vue'

export default {
  name: 'ss-author',
  props: ['comment'],
  components: {
    'user': CommentUser,
    'status': SSStatus,
    'voice': VoiceMsg
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

.c-word01 {
  font-size: 0.3rem;
  line-height: 0.4rem;
}

.ll_status {
  padding: 0.4rem 0 !important;
}

.comment {
  width: auto;
  overflow: hidden;
  background-color: #fff;
  padding: 0.38rem 0.42rem 0 0.48rem;
  margin-bottom: 0.2rem;
}
</style>
