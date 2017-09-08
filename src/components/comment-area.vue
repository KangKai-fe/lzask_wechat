<template>
  <div class="message">
    <textarea ref="textarea" name="" class="replayEdit"
      :placeholder="placeholder"
      v-model="replyContent"
      @blur="textareaBlur"
    ></textarea>
    <span class="icon_send" :class="{ 'active': readyToReply }" @click="reply"></span>
    <toast v-model="toastShow" :type="toastType">{{ toastMsg }}</toast>
  </div>
</template>

<script>
import { Toast } from 'vux'

export default {
  name: 'comment-area',
  props: {
    baskID: String, // 晒晒评论
    answerID: String, // 问问评论
    subjectID: String, // 讲讲评论
    topicID: String, // 聊聊评论
    replyCommentID: String,
    replyPlaceholder: String,
    maxContent: {
      type: Number,
      default: 400
    }, // 最大回复字数
    minContent: {
      type: Number,
      default: 2
    } // 最小回复字数
  },
  data () {
    return {
      replyContent: '',
      toastShow: false,
      toastMsg: '',
      canReply: true,
      toastType: ''
    }
  },
  computed: {
    placeholder () {
      if (this.$refs.textarea) {
        setTimeout(() => {
          this.$refs.textarea.focus()
        }, 300)
      }
      return this.replyPlaceholder || '在这里说点什么吧'
    },
    readyToReply () {
      if (this.replyContent.length >= this.minContent && this.replyContent.length <= this.maxContent) {
        return true
      }
      return false
    }
  },
  methods: {
    reply () {
      if (!this.canReply) {
        return
      }
      if (!this.readyToReply) {
        if (!this.replyContent) {
          this.toastMsg = '不能为空'
        } else if (this.replyContent.length < this.minContent) {
          this.toastMsg = '字数太少, 应多于' + this.minContent + '字'
        } else if (this.replyContent.length > this.maxContent) {
          this.toastMsg = '字数太多, 不应超过' + this.maxContent + '字'
        }
        this.toastShow = true
        this.toastType = 'cancel'
        setTimeout(() => {
          this.$refs.textarea.focus()
        }, 300)
        return
      }

      this.canReply = false // prevent multiple commit
      const userID = this.$http.userID
      let params = {
        userID: userID,
        content: this.replyContent
      }
      let replyUrl = ''
      if (this.baskID) { // 晒晒
        params.baskID = this.baskID
        replyUrl = '/baskComment/create'
      } else if (this.answerID) { // 问问
        params.answerID = this.answerID
        replyUrl = '/answerdiscuss/create'
      } else if (this.subjectID) { // 讲讲
        params.subjectID = this.subjectID
        replyUrl = '/talkComment/create'
      } else if (this.topicID) { // 聊聊
        params.topicID = this.topicID
        replyUrl = '/discuss/createByContent'
      } else {
        return
      }

      if (this.replyCommentID) {
        params.replyCommentID = this.replyCommentID
      }

      this.$http.get(replyUrl, {
        params
      })
        .then(res => {
          if (res.resultCode === 200) {
            this.$emit('commentSucceed', res.object || {}, this.replyContent)
            this.toastMsg = '评论成功'
            this.toastType = ''
            this.replyContent = ''
          } else {
            this.toastMsg = '评论失败, 请重试'
            this.toastType = 'cancel'
          }
          this.toastShow = true
          this.canReply = true
        })
        .catch(err => {
          console.log('err', err)
          this.toastMsg = '评论失败, 请重试'
          this.toastType = 'cancel'
          this.toastShow = true
          this.canReply = true
        })
    },
    textareaBlur () {
      // console.log('child blur')
      this.$emit('areaBlur')
    }
  },
  components: {
    Toast
  }
}
</script>

<style scoped>
.message {
  background-color: #fff;
  box-shadow: 0 0 5px #888;
  padding: 0.1rem 0.25rem;
  width: auto;
  overflow: hidden;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
}

textarea {
  background: none;
  width: 100%;
  border: none;
  background-size: 0.48rem;
  resize: none;
  flex: 1;
  margin-right: 0.3rem;
}
.icon_send {
  display: inline-block;
  width: 0.6rem;
  height: 0.6rem;
  background: url(../assets/img/icon_send.png) no-repeat center center;
  background-size: cover;
}
.icon_send.active {
  background-image: url(../assets/img/icon_send_blue.png);
}
</style>
