<template>
  <div :class="{ container_padded: commentable }">
    <!-- shaishai content -->
    <div class="question01">
      <author v-if="ssDetail.userInfo" :userInfo="ssDetail.userInfo"></author>
      <content-long v-if="ssDetail.childrenList && ssDetail.childrenList.length"
        :title="ssDetail.content"
        :cover="ssDetail.photoUrl"
        :childrenList="ssDetail.childrenList"
      ></content-long>
      <content-short v-if="ssDetail.picList && ssDetail.picList.length"
        :content="ssDetail.content"
        :url="ssDetail.url"
        :picList="ssDetail.picList"
        :picStr="ssDetail.picStr"
        :type="ssDetail.type"
        :soundTime="ssDetail.soundTime"
      ></content-short>
      <tags v-if="ssDetail.tagStr && ssDetail.tagStr !== ''" :tagStr="ssDetail.tagStr"></tags>
      <status v-if="ssDetail.createDate"
        :createDate="ssDetail.createDate"
        :viewCount="ssDetail.viewCount"
        :zanCount="ssDetail.zanCount"
        :zanStatus="ssDetail.zanStatus"
        :baskID="ssDetail.ID"
      ></status>
    </div>

    <!-- related recommend -->
    <related v-if="related !== {}" :related="related"></related>

    <!-- comment list -->
    <comments class="comments"
      :commentsList="commentsList"
      :commentsCount="ssDetail.commentCount"
      :btnAllShow="commentsBtnAllShow"
      :btnReplyShow="commentsBtnReplyShow"
      @commentClicked="replyComment"
      @commentCheckAll="getAllComments"
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
      commentsBtnAllShow: false,
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
            this.commentsBtnAllShow = false
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
            this.commentsBtnAllShow = true
          }
          if (res.object.userID !== this.$http.userID) {
            this.commentsBtnReplyShow = true
          }

          /* wechat */
          let wxTitle = res.object.content
          if (!wxTitle || (wxTitle.indexOf('.amr') !== -1)) {
            wxTitle = '老子问问 - 晒晒'
          }

          this.$wechat.ready(() => {
            // share info
            let shareData = {
              title: wxTitle, // 分享标题
              link: window.wx_shareUrl, // 分享链接
              imgUrl: res.object.photoUrl || (res.object.picList && res.object.picList[0]) || window.logo, // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            }
            // to timeline
            this.$wechat.onMenuShareTimeline(shareData)

            // to friend
            shareData.title = '老子问问 - 晒晒'
            shareData.desc = wxTitle
            this.$wechat.onMenuShareAppMessage(shareData)
          })
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
.question01 {
  background-color: #fff;
}

.comments {
  margin-top: 0.25rem;
}
</style>
