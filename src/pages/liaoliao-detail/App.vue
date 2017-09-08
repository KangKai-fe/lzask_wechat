<template>
  <div :class="{ container_padded: commentable }">
    <!-- liaoliao content -->
    <ll-detail :llInfo="llDetail"></ll-detail>

    <!-- comment list -->
    <comments
      :commentsList="commentsList"
      :commentsCount="llDetail.discussCount"
      :btnAllShow="btnAllShow"
      @checkMoreComments="getAllComments"
    ></comments>

    <!-- comment area -->
    <comment-area v-if="commentable && llDetail"
      :topicID="llDetail.ID"
      :minContent="10"
      @commentSucceed="commentSucceed"
    ></comment-area>
  </div>
</template>

<script>
/* tools */
import { querystring } from 'vux'

/* custom component */
import LLDetail from '../../components/liaoliao-detail.vue'
import LLComments from '../../components/liaoliao-comments.vue'
import CommentArea from '../../components/comment-area.vue'

export default {
  name: 'app',
  data () {
    return {
      topicID: '',
      llDetail: {},
      commentsList: [],
      btnAllShow: false,
      commentable: false
    }
  },
  computed: {
  },
  methods: {
    getAllComments () {
      this.$http.get('/discuss/list', {
        params: {
          topicID: this.topicID,
          pageSize: this.llDetail.discussCount
        }
      })
        .then(res => {
          if (res.resultCode === 200) {
            this.commentsList = res.object
            this.btnAllShow = false
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    commentSucceed (commentRes, commentContent) {
      let comment = {}
      comment = commentRes
      comment.userInfo = {}
      comment.userInfo.ID = this.$http.userID
      comment.userInfo.showName = this.$http.userName
      comment.userInfo.photo = this.$http.userPhoto
      comment.userInfo.accountBalance = {}
      comment.userInfo.accountBalance.grade = this.$http.userGrade
      if (!commentRes.content && commentContent) {
        comment.content = commentContent
      }
      if (this.commentTargetObj) {
        comment.parentComment = this.commentTargetObj
      }
      this.commentsList.push(comment)
    }
  },

  created () {
    // liaoliao id
    const topicID = querystring.parse().topicID
    this.topicID = topicID
    console.log(topicID)

    /* liaoliao detail */
    this.$http.get('/topic/detail', {
      params: {
        topicID: topicID
      }
    })
      .then(res => {
        if (res.resultCode === 200) {
          this.llDetail = res.object
          if (this.llDetail.discussCount > 3) {
            this.btnAllShow = true
          }

          if (this.llDetail.status === 3) {
            this.commentable = true
          }

          /* wechat */
          this.$wechat.ready(() => {
            // share info
            let shareData = {
              title: res.object.title, // 分享标题
              link: window.wx_shareUrl, // 分享链接
              imgUrl: res.object.picUrl || window.logo, // 分享图标
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
            shareData.title = '老子问问 - 聊聊'
            shareData.desc = res.object.title
            this.$wechat.onMenuShareAppMessage(shareData)
          })
        }
      })
      .catch(err => {
        console.log('err', err)
      })

    /* comments */
    this.$http.get('/discuss/list', {
      params: {
        topicID: topicID,
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
    'll-detail': LLDetail,
    'comments': LLComments,
    'comment-area': CommentArea
  }
}
</script>

<style>
</style>
