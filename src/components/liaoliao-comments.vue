<template>
  <div>
    <module-title title="精彩评论"></module-title>
    <div class="no_comment" v-if="commentsCount === 0">
      暂无评论
    </div>
    <div v-else>
      <comment v-for="comment in commentsList"
        :key="comment.ID"
        :comment="comment"
      ></comment>
      <div class="readMore" @click="showMore" v-if="btnMoreShow">
        <a href="javascript: void(0);">查看全部</a>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import ModuleTitle from './module-title.vue'
import LLComment from './liaoliao-comment.vue'

export default {
  name: 'ss-author',
  props: [ 'commentsList', 'commentsCount', 'btnMoreShow' ],
  methods: {
    showMore () {
      this.$emit('checkMoreComments')
    }
  },
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

.readMore {
  text-align: center;
  height: 1rem;
  line-height: 1rem;
}

.readMore a {
  display: block;
  margin: 0 auto;
  padding-left: 0.53rem;
  background: url(../assets/img/more_bg.png) no-repeat left center;
  font-size: 0.3rem;
  width: 1.27rem;
  color: #646464;
  background-size: 0.32rem;
}
</style>
