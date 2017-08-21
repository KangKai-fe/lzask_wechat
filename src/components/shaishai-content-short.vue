<template>
  <div>
    <audio-player class="voice_content" v-if="url && type === 2"
      :source="url.replace(/audio/, 'audio_mp3').replace(/\.amr/, '.mp3')"
      :soundTime="soundTime"
      @error="error"
    >
    </audio-player>
    <div class="ques-article01" v-else>
      {{ content }}
    </div>
    <photos :picList="picList" :picStr="picStr"></photos>
  </div>
</template>

<script>
import SSPhotos from './shaishai-photos.vue'
import AudioPlayer from './audio-player.vue'

export default {
  name: 'ss-short',
  props: [ 'content', 'picList', 'picStr', 'type', 'soundTime', 'url' ],
  methods: {
    error (e) {
      console.log(e)
    }
  },
  components: {
    'photos': SSPhotos,
    'audio-player': AudioPlayer
  }
}
</script>

<style scoped>
.ques-article01 {
  padding: 0.25rem;
  font-size: 0.3rem;
  line-height: 0.48rem;
  color: #646464;
}

.voice_content {
  margin: 0.25rem 0.25rem 0;
}
</style>
