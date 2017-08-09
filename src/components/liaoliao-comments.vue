<template>
  <div>
    <module-title title="精彩评论"></module-title>
    <div class="no_comment" v-if="commentsList.length === 0">
      暂无评论
    </div>
    <comment v-else v-for="comment in commentsList"
      :key="comment.ID"
      :comment="comment"
    ></comment>
  </div>
  </div>
</template>

<script>
import ModuleTitle from './module-title.vue'
import LLComment from './liaoliao-comment.vue'

export default {
  name: 'ss-author',
  props: ['commentsList'],
  components: {
    'module-title': ModuleTitle,
    'comment': LLComment
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

.no_comment {
  text-align: center;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.3rem;
  text-align: center;
}
</style>
