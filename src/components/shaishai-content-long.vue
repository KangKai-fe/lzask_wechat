<template>
  <div>
    <div class="ques-title02">
      {{ title }}
    </div>
    <div class="ques-article01" style="padding-bottom:0">
      <span class="article-img"><img :src="cover" alt="晒晒封面"></span>
    </div>
    <div v-for="item in childrenList"
      :key="item.ID"
    >
      <div class="ques-article01" v-if="item.type === 1">
        {{ item.content }}
      </div>
      <voice-msg v-if="item.type === 2"
        :url="item.url"
        :soundTime="item.soundTime"
        style="margin: 0 0.25rem;"
      ></voice-msg>
      <div class="ques-article01" v-else-if="item.type === 3" style="padding-bottom:0">
        <span class="article-img"><img :src="item.url" :alt="item.content"></span>
      </div>
    </div>
  </div>
</template>

<script>
import SSVoiceMsg from './shaishai-voice-msg.vue'

export default {
  name: 'ss-long',
  props: [ 'title', 'cover', 'childrenList' ],
  components: {
    'voice-msg': SSVoiceMsg
  }
}
</script>

<style scoped>
.ques-title02{font-size: 0.32rem;line-height: 0.48rem;color:#646464;padding:0.25rem 0.25rem 0 0.25rem;font-weight:bold}
.article-img{display: block;width: 100%;overflow: hidden;padding:0.25rem 0;}
.ss-voice02{margin:0 0.25rem}
.ques-article01{padding:0.25rem;font-size: 0.3rem;line-height: 0.48rem;color:#646464;}
.voice_content {
  margin: 0.25rem 0.25rem 0;
}
</style>
