<template>
  <div class="container">
    <tags class="question_tags"
      v-if="questionInfo.tagStr"
      :tagStr="questionInfo.tagStr"
    ></tags>

    <question class="question_info" v-if="questionInfo.question"
      :questionInfo="questionInfo"
    ></question>

    <!-- answer user info -->
    <user-info class="user_info" v-if="questionInfo.answerUserInfo"
      :userName="questionInfo.answerUserInfo.showName"
      :userIdentity="questionInfo.answerUserIdentity"
      :followCount="questionInfo.answerUserInfo.followCount"
      :photo="questionInfo.answerUserInfo.photo"
    ></user-info>

    <!-- related recommend -->
    <!-- <related></related> -->

    <!-- comment list -->
    <comments class="comments" v-if="questionInfo.answer && showWWComments"
      :commentsList="commentsList"
      :commentsCount="commentsTotalCount"
      :btnAllShow="commentsBtnAllShow"
      @commentClicked="replyComment"
      @commentCheckAll="getAllComments"
    ></comments>

    <!-- comment area -->
     <comment-area v-if="showWWComments && commentable"
      :answerID="answerID"
      :replyCommentID="replyCommentID"
      :replyPlaceholder="replyPlaceholder"
     ></comment-area>
  </div>
</template>

<script>
import { querystring } from 'vux'

/* custom component */
import Tags from '../../components/shaishai-tags.vue'
import SSRelated from '../../components/shaishai-related.vue'
import SSComments from '../../components/shaishai-comments.vue'
import WWQuestion from '../../components/wenwen-question-detail.vue'
import CommentArea from '../../components/comment-area.vue'
import UserInfoBrief from '../../components/user-info-brief.vue'

export default {
  name: 'app',
  data () {
    return {
      questionInfo: {},
      commentsList: [],
      relatedList: [],
      commentable: true,
      answerID: '',
      replyCommentID: '',
      replyPlaceholder: '',
      commentsBtnAllShow: false,
      commentsTotalCount: 0,
      showWWComments: false
    }
  },
  methods: {
    checkMoreUser () {
      console.log('check more users')
    },
    replyComment () {

    },
    getAllComments () {
      /* comments */
      this.$http.get('/answerdiscuss/list', {
        params: {
          answerID: this.answerID,
          userID: this.$http.userID,
          pageSize: this.commentsTotalCount
        }
      })
        .then(res => {
          if (res.resultCode === 200) {
            this.commentsList = res.object
            this.commentsBtnAllShow = false
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    }
  },
  created () {
    const questionID = querystring.parse().questionID
    const answerID = querystring.parse().answerID
    const userID = this.$http.userID
    this.answerID = answerID
    this.$http.get('/question/getDetail', {
      params: {
        questionID: questionID,
        userID: userID
      }
    })
      .then(res => {
        if (res.resultCode === 200) {
          this.questionInfo = res.object
        }
      })
      .catch(err => {
        console.log('------------- err -------------', err)
      })

    /* comments */
    this.$http.get('/answerdiscuss/list', {
      params: {
        answerID: answerID,
        userID: userID,
        pageSize: 3
      }
    })
      .then(res => {
        if (res.resultCode === 200) {
          this.commentsList = res.object
          console.log(this.commentsList)
          const totalCount = res.page.count
          this.commentsTotalCount = totalCount
          if (totalCount > 3) {
            this.commentsBtnAllShow = true
          }
        }
      })
      .catch(err => {
        console.log('err', err)
      })
  },
  components: {
    'tags': Tags,
    'related': SSRelated,
    'comments': SSComments,
    'question': WWQuestion,
    'comment-area': CommentArea,
    'user-info': UserInfoBrief
  }
}
</script>

<style scoped>
.question_tags {
  padding: 0.3rem 0.25rem !important;
}
.question_info, .user_info {
  background: #fff;
  margin-bottom: 0.15rem;
}
</style>
