<template>
  <dl>
    <dt class="info-img01">
      <a><lazy-img :src="answerUserInfo.photo" :alt="answerUserInfo.photoStr"></lazy-img></a>
      <span class="grade" v-if="answerUserInfo.accountBalance.grade">Lv.{{ answerUserInfo.accountBalance.grade }}</span>
    </dt>
    <dd class="info-txt01">
      <voice-msg v-if="answer.fileName && answer.soundTime"
        :answerID="answer.ID"
      ></voice-msg>
      <div v-else-if="answer.content">{{ answer.content }}</div>
      <text-msg  v-else
        :answerID="answer.ID"
      ></text-msg>
    </dd>
  </dl>
</template>

<script>
import LazyImg from './common-lazy-img.vue'
import WWVoice from './wenwen-voice-msg.vue'
import WWText from './wenwen-text-msg.vue'

export default {
  name: 'ww-answer',
  props: [ 'answerUserInfo', 'answer' ],
  components: {
    'voice-msg': WWVoice,
    'text-msg': WWText,
    'lazy-img': LazyImg
  }
}
</script>

<style scoped>
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
</style>
