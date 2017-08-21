<template>
  <div class="comment02">
    <div class="com02_title">评论
      <span>{{ commentsCount }}</span>
      <div class="btn_comment" @click.stop="replyBtnClickd">
        <i class="iconfont icon-icon"></i>
        写评论
      </div>
    </div>
    <!-- no comment -->
    <div class="no_comment" v-if="commentsCount === 0">
      暂无评论
    </div>
    <!-- comment list -->
    <div v-else>
      <comment v-for="comment in commentsList"
        :key="comment.ID"
        :comment="comment"
        @click.stop.native="commentClicked(comment.ID, comment.userInfo.showName, comment)"
        @parentClicked="parentClicked"
      ></comment>
      <div class="readMore" @click="showMore" v-if="btnMoreShow">
        <a href="javascript: void(0);">查看全部</a>
      </div>
    </div>
  </div>
</template>

<script>
import SSComment from './shaishai-comment.vue'
export default {
  name: 'ss-comments',
  props: [ 'commentsList', 'commentsCount', 'btnMoreShow' ],
  methods: {
    showMore () {
      this.$emit('commentCheckMore')
    },
    commentClicked (commentID, replyUserName, commentObj) {
      console.log('reply comment')
      this.$emit('commentClicked', commentID, replyUserName, commentObj)
    },
    parentClicked (commentID, replyUserName, parentComment) {
      this.$emit('commentClicked', commentID, replyUserName, parentComment)
    },
    replyBtnClickd () {
      this.$emit('commentClicked', '', null)
    }
  },
  created () {
    // console.log(this.commentsList)
  },
  components: {
    'comment': SSComment
  }
}
</script>

<style scoped>
.comment02 {
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  margin-bottom: 0.15rem;
}

.com02-word {
  width: auto;
  overflow: hidden;
  margin: 0.3rem 0 0 0.25rem;
  border-bottom: 0.01rem solid #e1e1e1;
  padding-bottom: 0.25rem;
}

.com02_title {
  color: #969696;
  font-size: 0.3rem;
  height: 1rem;
  line-height: 1rem;
  border-bottom: 0.01rem solid #e1e1e1;
  width: auto;
  padding: 0 0.25rem;
}

.com02_title span {
  color: #969696;
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

.no_comment {
  text-align: center;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.3rem;
  text-align: center;
  color: #646464;
}
.btn_comment {
  float: right;
}
</style>
