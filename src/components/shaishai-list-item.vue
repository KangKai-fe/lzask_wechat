<template>
  <div @click="checkDetail">
    <div class="ss-words01"
      :class="{
        'ss-words02': data.type === 0,
        'ss-voice01': data.type === 2
      }"
    >
      <dl class="ss-picList02" v-if="singlePicture">
        <dt>
          <photos
            :picList="data.picList"
            :picStr="data.picStr"
            :single="true"
          ></photos>
        </dt>
        <dd>
          {{ data.content }}
        </dd>
      </dl>
      <div class="ss-pics01" v-else-if="data.type === 0">
        <photos
          :picList="[data.photoUrl]"
          :picStr="data.photoFileName"
          :single="true"
        ></photos>
      </div>
      <photos v-else-if="pictureList.length"
        :picList="pictureList"
        :picStr="data.picStr"
      ></photos>
      <audio-player v-if="data.type === 2" class="simple_voice"
        :source="audioUrl"
        :soundTime="data.soundTime"
        @timeupdate="timeupdate"
        @playing="playing"
        @pause="pause"
        @ended="ended"
        @waiting="waiting"
        @error="error"
      >
        <!-- <voice-msg
          :url="data.url"
          :soundTime="data.soundTime"
          :tips="tips"
        ></voice-msg> -->
      </audio-player>
      <h3 class="ss-title01" v-else-if="!singlePicture">
        {{ data.content }}
      </h3>
      <tags v-if="data.tagStr && data.tagStr !== ''" :tagStr="data.tagStr"></tags>
      <status
        :createDate="data.createDate"
        :viewCount="data.viewCount"
        :zanCount="data.zanCount"
        :zanStatus="data.zanStatus"
        :baskID="data.ID"
      ></status>
    </div>
  </div>
</template>

<script>
import SSStatus from './shaishai-status.vue'
import SSPhotos from './shaishai-photos.vue'
// import SSVoiceMsg from './shaishai-voice-msg.vue'
import SSTags from './shaishai-tags.vue'
import AudioPlayer from './audio-player.vue'

export default {
  name: 'ss-list-item',
  props: [ 'data' ],

  data () {
    return {
      singlePicture: this.data.type === 1 && this.data.picList.length < 3,
      pictureList: this.data.picList && this.data.picList.length >= 3 ? this.data.picList.slice(0, 3) : [],
      audioUrl: this.data.url && this.data.url.replace(/audio/, 'audio_mp3').replace(/\.amr/, '.mp3'),
      tips: ''
    }
  },

  computed: {
  },

  methods: {
    checkDetail () {
      console.log(this.data.ID)
      // location.href = '/shaishai-detail.html?baskID=' + this.data.ID
      location.href = window.detailPathPrefix + '/shaishai-detail?baskID=' + this.data.ID
    },
    timeupdate (e) {
    },
    playing (e) {
    },
    pause (e) {
    },
    ended (e) {
    },
    waiting (e) {
    },
    error (e) {
      console.log(e)
    }
  },

  components: {
    'status': SSStatus,
    'tags': SSTags,
    // 'voice-msg': SSVoiceMsg,
    'photos': SSPhotos,
    'audio-player': AudioPlayer
  }
}
</script>

<style scoped>

.ss-words01 {
  width: auto;
  margin: 0.21rem 0.25rem;
  background-color: #fff;
  overflow: hidden;
  border-radius: 0.05rem;
}

.ss-words01 .picList01 {
  width: auto;
  overflow: hidden;
  padding: 0.3rem 0.125rem 0.3rem 0.125rem;
}

.picList01 li {
  width: 33.333%;
  float: left;
}

.picList01 li a {
  display: block;
  margin: 0 0.125rem;
}

.picList01 li a span {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  overflow: hidden
}

.ss-title01 {
  font-size: 0.32rem;
  line-height: 0.44rem;
  padding: 0 0.25rem 0.25rem;
  font-weight: normal;
}

.ss-words02 {
  width: auto;
  overflow: hidden;
}

.ss-pics01 {
  padding: 0.25rem;
}

.ss-picList02 {
  padding: 0.25rem;
  width: auto;
  overflow: hidden;
}

.ss-picList02 dt {
  float: left;
  width: 2rem;
  height: 2rem;
  overflow: hidden;
  background-size: cover;
}

.ss-picList02 dd {
  margin-left: 2.3rem;
  font-size: 0.32rem;
  line-height: 0.44rem;
  padding-top: 0.13rem;
  min-height: 1.87rem;
}

.simple_voice:first-child {
  margin-top: 0.27rem;
}

</style>
