<template lang="html">
  <div class="vue-audio-container" @click.stop.prevent="startPlay">
    <voice-msg :class="{ wenwen_voice_answer: type && type === 'wenwen' }"
      :url="source"
      :soundTime="soundTimeLeft"
      :tips="tips"
    ></voice-msg>
    <audio class="vue-audio"
			:muted="muted"
			:autoplay="autoplay"
			:preload="preload"
			:src="source"
			@ended="_ended"
			@playing="_playing"
			@pause="_pause"
			@error="_error"
			@timeupdate="_timeupdate"
			@waiting="_waiting">
    </audio>
  </div>
</template>

<script>
import SSVoiceMsg from './shaishai-voice-msg.vue'

let currentTarget
export default {
  props: {
    source: {
      type: String,
      required: true,
      validator: function (value) {
        return value
      }
    },
    soundTime: {
      type: Number
    },
    type: {
      type: String
    },
    preload: {
      type: String,
      default: 'none',
      validator: function (value) {
        return value === 'none' || value === 'auto' || value === 'metadata'
      }
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    muted: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      soundTimeLeft: this.soundTime,
      tips: this.soundTime ? '' : '点击播放',
      loadError: false,
      percentageLeft: 1
    }
  },
  methods: {
    startPlay (e) {
      this.loadError = false
      let target = e.currentTarget
      let audio = target.querySelector('audio')
      if (audio.paused || audio.ended) {
        audio.play()
      } else {
        audio.pause()
      }
    },
    _timeupdate (e) {
      this.$emit('timeupdate', e)
      this.percentageLeft = (e.srcElement.duration - e.srcElement.currentTime) / e.srcElement.duration
      // console.log(percentageLeft)
      this.soundTimeLeft = this.percentageLeft > 0 ? (this.soundTime * this.percentageLeft) : 0
      // console.log('left', this.soundTimeLeft)
    },
    _playing (e) {
      this.$emit('playing', e)
      this._stopOther(e.target.parentElement)
      if (this.soundTime) {
        this.tips = ''
      } else {
        this.tips = '正在播放'
      }
      // if (this.soundTime) {
      //   this.tips = ''
      //   this.percentageLeft = this.soundTime * this.percentageLeft
      // } else {
      //   this.tips = '正在播放'
      // }
    },
    _pause (e) {
      this.$emit('pause', e)
      if (!this.loadError) {
        this.tips = '继续播放'
        // this.soundTimeLeft = 0
      }
    },
    _waiting (e) {
      this.$emit('waiting', e)
      this.tips = '正在加载'
      this.soundTimeLeft = null
    },
    _ended (e) {
      if (!this.soundTime) {
        this.tips = '点击播放'
      }
      this.soundTimeLeft = this.soundTime
      this.$emit('ended', e)
    },
    _error (e) {
      this.loadError = true
      this.tips = '加载失败'
      this.$emit('error', e)
    },
    _stopOther (target) {
      // stop other audio which is playing
      if (currentTarget && currentTarget !== target) {
        let audio = currentTarget.querySelector('audio')
        audio.pause()
        // audio.currentTime = 0
        console.log(audio)
      }
      currentTarget = target
    }
  },
  components: {
    'voice-msg': SSVoiceMsg
  }
}
</script>
<style scoped>
.vue-audio-container {
  position: relative;
  display: inline-block;
}
.wenwen_voice_answer:before {
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