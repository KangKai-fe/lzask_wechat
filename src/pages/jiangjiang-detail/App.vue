<template>
  <div :class="{ container_padded: commentable }">
    <!-- shaishai content -->
    <div class="spearkDetail_banner">
        <span class="banner_img02"><img src="images/jj03.png" alt=""></span>
        <div class="jj-txt02 jjBanner_title01">
            <h3><a href="#">
                摄影用光的奥秘，拍出好照片的必修课</a>
            </h3>
            <p>孟克柔<span>|</span>知名摄影师11年影视摄影经验</p>
        </div>
    </div>

    <!-- related recommend -->
    <related v-if="related !== {}" :related="related"></related>

    <!-- comment list -->
    <comments class="comments"
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
      :baskID="baskID"
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
import Author from '../../components/shaishai-author.vue'
import SSLong from '../../components/shaishai-content-long.vue'
import SSShort from '../../components/shaishai-content-short.vue'
import SSStatus from '../../components/shaishai-status.vue'
import SSTags from '../../components/shaishai-tags.vue'
import SSRelated from '../../components/shaishai-related.vue'
import SSComments from '../../components/shaishai-comments.vue'
import CommentArea from '../../components/comment-area.vue'

export default {
  name: 'app',
  data () {
    return {
      ssDetail: {},
      commentsList: [],
      related: {},
      commentable: true,
      baskID: '',
      replyCommentID: '',
      replyPlaceholder: '',
      commentsBtnMoreShow: false,
      commentsBtnReplyShow: false,
      commentTargetObj: null
    }
  },
  computed: {
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
        params: {
          baskID: this.baskID,
          currentUserID: this.$http.userID,
          pageSize: this.ssDetail.commentCount
        }
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
    const baskID = querystring.parse().baskID
    const userID = this.$http.userID
    this.baskID = baskID
    // console.log(baskID)

    this.$http.get('/bask/detail', {
      params: {
        baskID: baskID
      }
    })
      .then(res => {
        if (res.resultCode === 200) {
          this.ssDetail = res.object
          this.related = res.object.related
          if (res.object.commentCount > 3) {
            this.commentsBtnMoreShow = true
          }
          if (res.object.userID !== this.$http.userID) {
            this.commentsBtnReplyShow = true
          }
        }
      })
      .catch(err => {
        console.log('err', err)
      })

    /* comments */
    this.$http.get('/baskComment/listByPublish', {
      params: {
        baskID: baskID,
        currentUserID: userID,
        pageSize: 3
      }
    })
      .then(res => {
        if (res.resultCode === 200) {
          this.commentsList = res.object
        }
      })
      .catch(err => {
        console.log('err', err)
      })
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

<style>
.spearkDetail_banner {
  width: 100%;
  overflow: hidden;
}

.banner_img02 {
  display: block;
  width: 100%;
  overflow: hidden;
}

.jjBanner_title01 {
  width: auto;
  overflow: hidden;
  padding: 0.25rem;
  margin-left: 0;
  background-color: #fff;
  margin-bottom: 0.2rem;
}
</style>
