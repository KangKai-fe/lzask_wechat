<template lang="html">
  <div class="vue-audio-container" @click.stop.prevent="startPlay">
    <slot></slot>
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
  methods: {
    startPlay (e) {
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
    },
    _playing (e) {
      this.$emit('playing', e)
      this._stopOther(e.target.parentElement)
    },
    _pause (e) {
      this.$emit('pause', e)
    },
    _waiting (e) {
      this.$emit('waiting', e)
    },
    _ended (e) {
      this.$emit('ended', e)
    },
    _error (e) {
      this.$emit('error', e)
    },
    _stopOther (target) {
      // stop other audio which is playing
      if (currentTarget && currentTarget !== target) {
        let audio = currentTarget.querySelector('audio')
        audio.pause()
        // audio.currentTime = 0
      }
      currentTarget = target
    }
  }
}
</script>
<style scoped>
  .vue-audio-container {
    position: relative;
    display: inline-block;
  }
</style>