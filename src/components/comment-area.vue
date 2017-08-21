<template>
  <div class="message">
    <textarea ref="textarea" name="" class="replayEdit"
      :placeholder="placeholder"
      v-model="replyContent"
      @blur="textareaBlur"
    >{{ replyContent }}</textarea>
    <i class="iconfont icon-feiji" @click="reply"></i>
    <toast v-model="toastShow" :type="toastType">{{ toastMsg }}</toast>
  </div>
</template>

<script>
import { Toast } from 'vux'

export default {
  name: 'comment-area',
  props: {
    baskID: String,
    answerID: String,
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
    }
  },
  methods: {
    reply () {
      if (!this.canReply) {
        return
      }
      if (this.replyContent.length < 4) {
        this.toastMsg = '字数太少'
        if (!this.replyContent) {
          this.toastMsg = '不能为空'
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
      if (this.baskID) {
        params.baskID = this.baskID
        if (this.replyCommentID) {
          params.replyCommentID = this.replyCommentID
        }
        replyUrl = '/baskComment/create'
      } else if (this.answerID) {
        params.answerID = this.answerID
        replyUrl = '/answerdiscuss/create'
      } else {
        return
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
      console.log('child blur')
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
.icon-feiji {
  font-size: 0.6rem;
}
</style>
