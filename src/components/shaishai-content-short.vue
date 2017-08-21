<template>
  <div>
    <voice v-if="soundTime !== 0 && type === 2"
      class="voice_content"
      :url="content"
      :soundTime="soundTime"
    ></voice>
    <div class="ques-article01" v-else>
      {{ content }}
    </div>
    <photos :picList="picList" :picStr="picStr"></photos>
  </div>
</template>

<script>
import SSPhotos from './shaishai-photos.vue'
import SSVoice from './shaishai-voice-msg.vue'

export default {
  name: 'ss-short',
  props: [ 'content', 'picList', 'picStr', 'type', 'soundTime' ],
  methods: {
  },
  components: {
    'photos': SSPhotos,
    'voice': SSVoice
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ques-article01{padding:0.25rem;font-size: 0.3rem;line-height: 0.48rem;color:#646464;}
.voice_content {
  margin: 0.25rem 0.25rem 0;
}
</style>
