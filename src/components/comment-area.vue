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
    replyCommentID: String,
    replyPlaceholder: String
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
      if (this.replyContent.length > 4 && this.replyContent.length <= 200) {
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
        } else if (this.replyContent.length < 4) {
          this.toastMsg = '字数太少'
        } else {
          this.toastMsg = '字数太多'
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
            this.toastMsg = '评论成功'
            this.toastType = ''
            this.replyContent = ''
            this.$emit('commentSucceed', res.object)
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
  box-shadow: -1px 5px 10px #c2c2c2;
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
  min-height: 1.1rem;
  border: none;
  background-size: 0.48rem;
  resize: none;
  flex: 1;
  margin-right: 0.3rem;
}
.icon_send {
  display: inline-block;
  width: 0.75rem;
  height: 0.71rem;
  background: url(../assets/img/icon_send.png) no-repeat center center;
  background-size: cover;
}
.icon_send.active {
  background-image: url(../assets/img/icon_send_blue.png);
}
</style>
