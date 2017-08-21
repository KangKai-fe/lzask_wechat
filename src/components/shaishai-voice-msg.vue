<template>
  <div class="c-voice01" @click="playVoice">
    <span class="times" v-if="soundTime">{{ soundDuration }}</span>
    <span class="times" v-else>{{ tips }}</span>
    <strong class="voice01"><img src="../assets/img/voice.png" alt=""></strong>
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('zh-cn')

export default {
  name: 'ss-voice-msg',
  props: [ 'soundTime', 'url', 'tips' ],
  computed: {
    soundDuration () {
      return moment().hour(0).minutes(0).seconds(0).milliseconds(0).add(this.soundTime, 'milliseconds').format('mm\' ss"')
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
