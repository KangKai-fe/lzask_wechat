<template>
  <div>
    <!-- liaoliao content -->
    <ll-detail :llInfo="llDetail"></ll-detail>

    <!-- comment list -->
    <comments
      :commentsList="commentsList"
      :commentsCount="llDetail.discussCount"
      :btnAllShow="btnAllShow"
      @checkMoreComments="getAllComments"
    ></comments>
  </div>
</template>

<script>
/* tools */
import { querystring } from 'vux'

/* custom component */
import LLDetail from '../../components/liaoliao-detail.vue'
import LLComments from '../../components/liaoliao-comments.vue'

export default {
  name: 'app',
  data () {
    return {
      topicID: '',
      llDetail: {},
      commentsList: [],
      btnAllShow: false
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
    'comments': LLComments
  }
}
</script>

<style>
.question01 {
  background-color: #fff;
}

.message {
  background-color: #fff;
  box-shadow: -1px 5px 10px #c2c2c2;
  padding: 0.1rem 0.25rem;
  width: auto;
  overflow: hidden;
}

.message textarea {
  background: none;
  width: 100%;
  min-height: 1.1rem;
  border: none;
  background: url(../../assets/img/message_bg.png) no-repeat right center;
  display: block;
  color: #bcbcbc;
  background-size: 0.48rem;
}
</style>
