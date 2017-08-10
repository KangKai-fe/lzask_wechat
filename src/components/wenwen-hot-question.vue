<template>
  <div class="container" @click="checkWenWenDetail">
    <div class="ww-con01">
      {{ question.content }}
    </div>
    <dl class="ww-info" v-if="answer">
      <dt class="info-img01">
        <!-- <a><img :src="answerUserInfo.photo" :alt="answerUserInfo.photoStr"></a> -->
        <a><lazy-img :src="answerUserInfo.photo" :alt="answerUserInfo.photoStr"></lazy-img></a>
        <span class="grade" v-if="answerUserInfo.level">{{ answerUserInfo.level }}</span>
      </dt>
      <dd class="info-txt01">
        <voice-msg v-if="answer.soundTime"
          :answerID="answer.ID"
        ></voice-msg>
        <div v-else-if="answer.content">{{ answer.content }}</div>
        <div class="c-voice01 ww-voice02" v-else>
          <span class="times">点击查看</span>
          <span class="msg_icon">Aa</span>
        </div>
      </dd>
    </dl>
    <dl class="multiple_answers ww-info" v-else-if="answerUsers">
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
      :viewCount="question.viewCount"
      :zanCount="question.zanCount"
      :zanStatus="0"
    ></status>
  </div>
</template>

<script>
import SSStatus from './shaishai-status.vue'
import WWVoice from './wenwen-voice-msg.vue'
import LazyImg from './common-lazy-img.vue'

export default {
  name: 'ww-hot-question',
  props: [ 'questionInfo' ],
  data () {
    return {
      answer: this.questionInfo.answer || null,
      answerUserInfo: this.questionInfo.answerUserInfo || null,
      answerUsers: this.questionInfo.answerUsers || null,
      question: this.questionInfo.question || null
    }
  },
  components: {
    'status': SSStatus,
    'voice-msg': WWVoice,
    'lazy-img': LazyImg
  },
  methods: {
    checkWenWenDetail () {
      const questionID = this.questionInfo.questionID
      console.log('quesitonID: ', questionID)
    }
  }
}
</script>

<style scoped>
.container {
  border-bottom: 0.01rem solid #e1e1e1;
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
  box-shadow: 0.01rem 0.02rem 0.12rem #b0d7ff
}
.grade {
  display: block;
  width: 0.22rem;
  height: 0.22rem;
  border: 0.02rem solid #fff;
  border-radius: 50%;
  background-color: #ff6489;
  color: #fff;
  line-height: 0.24rem;
  text-align: center;
  position: absolute;
  bottom: 0;
  right: -0.03rem;
  font-size: 0.14rem;
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
.msg_icon {
  font-size: 0.3rem;
  color: #fff;
  float: right;
  margin-right: 0.36rem;
}
.question_status {
  padding: 0.31rem 0.23rem 0.31rem !important;
  margin: 0 0.25rem 0;
}
.info-img02 {
  width: 2.06rem;
}

.info-img02 a {
  position: absolute;
}

.info-img02 a:nth-of-type(1) {
  z-index: 3;
  left: 0;
  top: 0;
}

.info-img02 a:nth-of-type(2) {
  z-index: 2;
  left: 0.5rem;
  top: 0;
}

.info-img02 a:nth-of-type(3) {
  z-index: 1;
  left: 0.97rem;
  top: 0;
}

.more02 {
  color: #389aff;
  font-size: 0.3rem;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 4;
  height: 0.3rem;
  line-height: 0.2rem
}

.info-txt02 {
  margin-left: 2.1rem;
}

.info-txt02 p {
  width: 3.2rem;
  height: 0.7rem;
  line-height: 0.7rem;
  border-radius: 0.85rem;
  text-align: center;
  color: #fff;
  font-size: 0.3rem;
  background-color:#cabdd0;
  background: -webkit-linear-gradient(left, #fec8c8, #81aedc);
}

</style>
