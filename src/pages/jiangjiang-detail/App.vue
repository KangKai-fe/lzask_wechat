<template>
  <div :class="{ container_padded: commentable }">
    <!-- shaishai content -->
    <div class="spearkDetail_banner" v-if="jjDetail">
        <img class="jj_photo" src="../../assets/img/jj03.png" alt="">
        <div class="jj-txt02">
            <h3>摄影用光的奥秘，拍出好照片的必修课</h3>
            <p>孟克柔<span>|</span>知名摄影师11年影视摄影经验</p>
        </div>
    </div>

    <!-- author info -->
    <author class="author_info" v-if="jjDetail"
      :userID="jjDetail.userInfo.ID"
      :userName="jjDetail.userInfo.showName"
      :userIdentity="jjDetail.userInfo.summary"
      :photo="jjDetail.userInfo.photo"
    ></author>

    <!-- comment list -->
    <comments class="comments" v-if="commentsList && commentsList.length"
      :commentsList="commentsList"
      :commentsCount="ssDetail.commentCount"
      :btnMoreShow="commentsBtnMoreShow"
      :btnReplyShow="commentsBtnReplyShow"
      @commentClicked="replyComment"
      @commentCheckMore="getAllComments"
      @replyBtnClickd="replyComment"
    ></comments>

    <!-- comment area -->
     <comment-area v-if="commentable"
      :replyCommentID="replyCommentID"
      :replyPlaceholder="replyPlaceholder"
      @areaBlur="areaBlur"
      @commentSucceed="commentSucceed"
     ></comment-area>
  </div>
</template>

<script>
/* tools */
import { querystring } from 'vux'

/* custom component */
import Author from '../../components/user-info-brief.vue'
import SSLong from '../../components/shaishai-content-long.vue'
import SSShort from '../../components/shaishai-content-short.vue'
import SSStatus from '../../components/shaishai-status.vue'
import SSTags from '../../components/shaishai-tags.vue'
import SSRelated from '../../components/shaishai-related.vue'
import SSComments from '../../components/shaishai-comments.vue'
import CommentArea from '../../components/comment-area.vue'

/* mockdata */
import JJDetail from '../../mockdata/jiangjiang-detail-info'

export default {
  name: 'app',
  data () {
    return {
      jjDetail: null,
      commentsList: [],
      related: {},
      commentable: true,
      subjectID: '',
      replyCommentID: '',
      replyPlaceholder: '',
      commentsBtnMoreShow: false,
      commentsBtnReplyShow: false,
      commentTargetObj: null
    }
  },
  computed: {
    params () {
      let params = {}
      params.subjectID = this.subjectID || 'a0e0f2f3b551477faced93b9b26e42b0'
      params.currentUserID = this.$http.userID
      params.appClient = 3
      return params
    }
  },
  methods: {
    replyComment (commentID, replyUserName, commentObj) {
      this.replyCommentID = commentID
      this.commentTargetObj = commentObj
      if (replyUserName) {
        this.replyPlaceholder = '回复:' + replyUserName
      } else {
        this.replyPlaceholder = '在这里说点什么吧'
      }
      console.log('target', this.replyCommentID)
    },
    getAllComments () {
      this.$http.get('/baskComment/listByPublish', {
        params: this.params
      })
        .then(res => {
          if (res.resultCode === 200) {
            this.commentsList = res.object
            this.commentsBtnMoreShow = false
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    areaBlur () {
      // console.log('father blur')
      // this.replyCommentID = ''
      // this.replyPlaceholder = ''
    },
    commentSucceed (commentRes) {
      let comment = {}
      comment = commentRes
      comment.userInfo = {}
      comment.userInfo.ID = this.$http.userID
      comment.userInfo.showName = this.$http.userName
      comment.userInfo.photo = this.$http.userPhoto
      comment.userInfo.accountBalance = {}
      comment.userInfo.accountBalance.grade = this.$http.userGrade
      if (this.commentTargetObj) {
        comment.parentComment = this.commentTargetObj
      }
      this.commentsList.unshift(comment)
      this.ssDetail.commentCount++
    }
  },

  created () {
    // 晒晒 id
    const subjectID = querystring.parse().subjectID
    this.subjectID = subjectID
    this.jjDetail = JJDetail

    // this.$http.get('/bask/detail', {
    //   params: this.params
    // })
    //   .then(res => {
    //     if (res.resultCode === 200) {
    //       this.ssDetail = res.object
    //       this.related = res.object.related
    //       if (res.object.commentCount > 3) {
    //         this.commentsBtnMoreShow = true
    //       }
    //       if (res.object.userID !== this.$http.userID) {
    //         this.commentsBtnReplyShow = true
    //       }
    //     }
    //   })
    //   .catch(err => {
    //     console.log('err', err)
    //   })

    // /* comments */
    // this.$http.get('/baskComment/listByPublish', {
    //   params: this.params
    // })
    //   .then(res => {
    //     if (res.resultCode === 200) {
    //       this.commentsList = res.object
    //     }
    //   })
    //   .catch(err => {
    //     console.log('err', err)
    //   })
  },

  components: {
    'author': Author,
    'content-long': SSLong,
    'content-short': SSShort,
    'tags': SSTags,
    'status': SSStatus,
    'related': SSRelated,
    'comments': SSComments,
    'comment-area': CommentArea
  }
}
</script>

<style scoped>
.spearkDetail_banner {
  width: 100%;
  margin-bottom: 0.2rem;
  overflow: hidden;
  background: #fff;
}

.jj-txt02 {
  width: auto;
  overflow: hidden;
  padding:0.25rem;
  margin-left: 0;
  background-color:#fff;
  min-height: 1.2rem;
}

.jj-txt02 h3 {
  font-size: 0.32rem;
  height: 0.39rem;
  line-height: 0.39rem;
  overflow: hidden;
  padding-top: 0.05rem;
}

.jj-txt02 p {
  color: #969696;
  font-size: 0.28rem;
  padding: 0.05rem 0;
}

.jj-txt02 p span {
  margin: 0 0.2rem;
  color: #969696;
}

/* author info */
.author_info {
  width: auto;
  overflow: hidden;
  padding: 0.25rem !important;
  margin-bottom: 0.2rem;
}

</style>
