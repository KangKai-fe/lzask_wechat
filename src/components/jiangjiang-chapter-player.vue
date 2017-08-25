<template lang="html">
  <div class="container"
    @click.stop.prevent="startPlay"
  >
    <span class="arrow01"></span>
    <strong class="number01">{{ index + 1 }}.  </strong>
    <p>{{ chapterName }}</p>
    <span class="time01">{{ duration }}</span>

    <audio class="jj_audio_player"
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
import moment from 'moment'
let currentTarget
export default {
  props: {
    source: {
      type: String,
      required: true
    },
    chapterName: {
      type: String
    },
    soundTime: {
      type: Number
    },
    index: {
      type: Number
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
      duration: moment().hour(0).minutes(0).seconds(0).milliseconds(0).add(this.soundTime, 'milliseconds').format('mm:ss'),
      audios: []
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.audios = document.getElementsByClassName('jj_audio_player')
    })
  },
  methods: {
    startPlay (e) {
      let target = e.currentTarget
      let audio = target.querySelector('audio')
      if (audio.paused || audio.ended) {
        e.target.parentElement.className = 'playing'
        audio.play()
      } else {
        e.target.parentElement.className = 'container'
        audio.pause()
      }
    },
    _timeupdate (e) {
      this.$emit('timeupdate', e)
    },
    _playing (e) {
      e.target.parentElement.className = 'playing'
      this.$emit('playing', e)
      this._stopOther(e.target.parentElement)
    },
    _pause (e) {
      e.target.parentElement.className = 'container'
      this.$emit('pause', e)
    },
    _waiting (e) {
      this.$emit('waiting', e)
    },
    _ended (e) {
      this.$emit('ended', e)
      this._modeControl()
    },
    _error (e) {
      this.$emit('error', e)
    },
    _modeControl () {
      let index = this.index
      let nextIndex
      // order mode
      if (index < this.audios.length - 1) {
        nextIndex = index + 1
        this.audios[nextIndex].play()
        return
      }
    },
    _stopOther (target) {
      // stop other audio which is playing
      if (currentTarget && currentTarget !== target) {
        let audio = currentTarget.querySelector('audio')
        audio.pause()
        audio.currentTime = 0
      }
      currentTarget = target
    }
  }
}
</script>
<style scoped>

.container,
.playing {
  font-size: 0.32rem;
  line-height: 0.44rem;
  padding-bottom: 0.25rem;
  position: relative;
}

.number01 {
  float: left;
  width: 0.48rem;
  color: #969696;
}

.time01 {
  background: url(../assets/img/icon_chapter_list_time.png) no-repeat left center;
  background-size: 0.24rem 0.3rem;
  color: #b2b2b2;
  font-size: 0.24rem;
  position: absolute;
  right: 0;
  top: 0;
  padding-left: 0.4rem;
}


.arrow01 {
  float: left;
  display: none;
  width: 0.39rem;
  height: 0.44rem;
  margin-right: 0.1rem;
  background: url(../assets/img/icon_playing_list.png) no-repeat center center;
  background-size: 0.2925rem 0.33rem;
}

.playing .arrow01 {
  display: block;
}

.container p {
  margin: 0 1.7rem 0 0.48rem;
}

.playing p {
  margin: 0 1rem 0 1rem;
}

</style>