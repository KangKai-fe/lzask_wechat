<template>
  <dl>
    <dt class="info-img01 info-img02">
      <a href="javascript: void(0);" v-for="user in answerUsers.slice(0, 3)" :key="user.ID">
        <lazy-img :src="user.photo" :alt="user.photoStr"></lazy-img>
      </a>
      <strong v-if="answerUsers.length > 3" class="more02">…</strong>
    </dt>
    <dd class="info-txt01 info-txt02">
      <p>共{{ answerUsers.length }}个人回答</p>
    </dd>
  </dl>
</template>

<script>
import LazyImg from './common-lazy-img.vue'

export default {
  name: 'ww-answer-multiple',
  props: [ 'answerUsers' ],
  components: {
    'lazy-img': LazyImg
  }
}
</script>

<style scoped>
.c-voice01:before {
    border-bottom: 0.2rem solid #fac7c9;
    border-left: 0.18rem solid transparent;
    top: -0.18rem;
    left: 0.05rem;
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
