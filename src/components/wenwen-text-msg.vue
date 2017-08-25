<template>
  <div>
    <div v-if="textAnswer">{{ textAnswer }}</div>
    <div v-else class="c-voice01 ww-voice02" @click.stop="showTextAnswer">
      <span class="times">{{ textAnswerTips }}</span>
      <span class="msg_icon">Aa</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ww-text-msg',
  props: [ 'answerID' ],
  data () {
    return {
      textAnswerTips: '点击查看回答',
      textAnswer: ''
    }
  },
  computed: {
    params () {
      let params = {}
      params.userID = this.$http.userID
      params.answerID = this.answerID
      return params
    }
  },
  methods: {
    showTextAnswer () {
      this.textAnswerTips = '正在加载'
      this.$http.get('/answer/getAnswer', {
        params: this.params
      })
        .then(res => {
          if (res.resultCode === 200) {
            this.textAnswer = res.object.content
            this.viewCount++
            this.textAnswerTips = '点击查看回答'
          }
        })
        .catch(err => {
          console.log('------------- err -------------', err)
          this.textAnswerTips = '点击查看回答'
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.c-voice01:before {
  content: '';
  width: 0;
  height: 0;
  border-top: 0.21rem solid #fdc8c8;
  border-left: 0.18rem solid transparent;
  position: absolute;
  top: 0.33rem;
  left: -0.16rem;
  border-bottom: none;
}

.msg_icon {
  font-size: 0.3rem;
  color: #fff;
  float: right;
  margin-right: 0.36rem;
}
</style>
