<template>
  <div class="c-voice01" :data-url="url" @click.stop="playVoice">
      <span class="times">{{ soundDuration }}</span>
      <strong class="voice01"><img src="../assets/img/voice.png" alt=""></strong>
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
.ss-voice01 .c-voice01{margin:0.1rem 0.25rem 0.25rem;}
</style>
