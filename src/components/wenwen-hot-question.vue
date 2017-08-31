<template>
  <div class="container" @click="checkWenWenDetail">
    <div class="ww-con01">
      {{ question.content }}
    </div>
    <answer class="ww-info" v-if="answer && answerUserInfo"
      :answer="answer"
      :answerUserInfo="answerUserInfo"
    ></answer>
    <multiple-answer class="ww-info" v-else-if="answerUsers"
      :answerUsers="answerUsers"
    ></multiple-answer>
    <status class="question_status"
      :createDate="question.publishDate"
      :viewCount="viewCount"
      :zanCount="question.zanCount"
      :zanStatus="0"
      :questionID="questionInfo.questionID"
    ></status>
  </div>
</template>

<script>
import SSStatus from './shaishai-status.vue'
import WWAnswer from './wenwen-answer.vue'
import WWAnswerMultiple from './wenwen-answer-multiple.vue'
import LazyImg from './common-lazy-img.vue'

export default {
  name: 'ww-hot-question',
  props: [ 'questionInfo' ],
  data () {
    return {
      answer: this.questionInfo.answer,
      answerUserInfo: this.questionInfo.answerUserInfo,
      answerUsers: this.questionInfo.answerUsers,
      question: this.questionInfo.question,
      textAnswer: '',
      viewCount: this.questionInfo.question.viewCount,
      textAnswerTips: '点击查看回答'
    }
  },
  computed: {
    params () {
      let params = {}
      params.userID = this.$http.userID
      params.answerID = this.answer.ID
      return params
    }
  },
  methods: {
    checkWenWenDetail () {
      const questionID = this.questionInfo.questionID
      const answerID = this.answer.ID
      // location.href = '/wenwen-detail.html?questionID=' + questionID + '&answerID=' + answerID
      location.href = window.detailPathPrefix + '/wenwen-detail?questionID=' + questionID + '&answerID=' + answerID
    },

    showTextAnswer () {
      this.textAnswerTips = '正在加载'
      this.$http.get('/answer/getAnswer', {
        params: this.params
      })
        .then(res => {
          if (res.resultCode === 200) {
            this.textAnswer = res.object.content
            this.viewCount++
          }
          this.textAnswerTips = '点击查看回答'
        })
        .catch(err => {
          console.log('------------- err -------------', err)
          this.textAnswerTips = '点击查看回答'
        })
    }
  },
  components: {
    'status': SSStatus,
    'answer': WWAnswer,
    'multiple-answer': WWAnswerMultiple,
    'lazy-img': LazyImg
  }
}
</script>

<style scoped>
.container {
  padding-top: 0.3rem;
  border-bottom: 0.01rem solid #e1e1e1;
  background: #fff;
}

.ww-con01 {
  font-size: 0.32rem;
  line-height: 0.44rem;
  padding: 0 0.48rem 0.25rem;
}

.ww-info {
  width: auto;
  height: auto;
  padding: 0 0.48rem 0;
  min-height: 0.8rem;
}

.question_status {
  padding: 0.31rem 0.23rem 0.31rem !important;
  margin: 0 0.25rem 0;
}
</style>
