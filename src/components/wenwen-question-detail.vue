<template>
  <div class="container">
    <dl class="det-list02">
      <dt><lazy-img :src="questionUser.photo" :alt="questionUser.photoStr"></lazy-img></dt>
      <dd>
        <h4>{{ questionUser.showName }}</h4>
        <p>{{ question.content }}</p>
      </dd>
    </dl>
    <answer class="det-list03" v-if="answer && answerUserInfo"
      :answer="answer"
      :answerUserInfo="answerUserInfo"
    ></answer>
    <multiple-answer class="det-list03" v-else-if="answerUsers"
      :answerUsers="answerUsers"
    ></multiple-answer>
    <status class="question_status"
      :createDate="question.publishDate"
      :viewCount="questionInfo.question.viewCount"
      :zanCount="question.zanCount"
      :zanStatus="0"
      :questionID="questionInfo.questionID"
    ></status>
  </div>
</template>

<script>
import SSStatus from './shaishai-status.vue'
import LazyImg from './common-lazy-img.vue'
import WWAnswer from './wenwen-answer.vue'
import WWAnswerMultiple from './wenwen-answer-multiple.vue'

export default {
  name: 'ww-question-detail',
  props: [ 'questionInfo' ],
  data () {
    return {
      answer: this.questionInfo.answer,
      answerUserInfo: this.questionInfo.answerUserInfo,
      answerUsers: this.questionInfo.answerUsers,
      question: this.questionInfo.question,
      questionUser: this.questionInfo.askUserInfo
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
.question_status {
  margin: 0 0.25rem 0;
  padding: 0.31rem 0.23rem 0.31rem !important;
}
.det-list02 {
  width: auto;
  padding: 0.3rem 0.25rem 0;
}
.det-list02 dt {
  width: 0.72rem;
  height: 0.72rem;
  border-radius: 0.7rem;
  overflow: hidden;
  float: left;
}
.det-list02 dd {
  margin-left: 0.9rem;
}
.det-list02 dd h4 {
  font-size: 0.3rem;
  color: #969696;
  font-weight: normal;
}
.det-list02 dd p {
  font-size: 0.32rem;
}
.det-list03 {
  width: auto;
  overflow: hidden;
  padding: 0.3rem 0.25rem;
  border-bottom: 0.01rem solid #e1e1e1;
}
</style>
