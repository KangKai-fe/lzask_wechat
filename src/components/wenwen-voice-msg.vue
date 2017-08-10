<template>
  <div class="c-voice01 ww-voice02">
    <span class="times">点击播放</span>
    <strong class="voice01"><img src="../assets/img/voice.png"></strong>
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('zh-cn')

export default {
  name: 'ss-voice-msg',
  props: [ 'soundTime', 'url' ],
  data () {
    return {
      soundDuration: moment().hour(0).minutes(0).seconds(0).add(this.soundTime, 'seconds').format('H mm\' ss"')
    }
  },
  methods: {
    playVoice () {
      console.log(this.url)
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
</style>
