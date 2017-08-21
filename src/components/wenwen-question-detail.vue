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
    <dl class="multiple_answers" v-else-if="answerUsers">
      <dt class="info-img01 info-img02">
        <a href="javascript: void(0);" v-for="user in answerUsers.slice(0, 3)" :key="user.ID"><img :src="user.photo" :alt="user.photoStr"></a>
        <strong v-if="answerUsers.length > 3" class="more02">…</strong>
      </dt>
      <dd class="info-txt01 info-txt02">
        <p>共{{ answerUsers.length }}个人回答</p>
      </dd>
    </dl>
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
.info-img01 {
  float: left;
  position: relative;
  width: 0.8rem;
  height: 0.8rem;
}
.info-img01 a {
  display: block;
  width: 0.76rem;
  height: 0.76rem;
  border-radius: 0.78rem;
  overflow: hidden;
  border: 0.02rem solid #fff;
  box-shadow: 0.01rem 0.02rem 0.12rem #b0d7ff;
}
.info-txt01 {
  margin-left: 1.27rem;
  position: relative;
  font-size: 0.3rem;
}
.info-txt01 .c-voice01:before {
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
