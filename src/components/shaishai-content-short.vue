<template>
  <div>
    <div class="ques-article01">
      {{ content }}
    </div>
    <photos :picList="picList" :picStr="picStr"></photos>
  </div>
</template>

<script>
import SSPhotos from './shaishai-photos.vue'

export default {
  name: 'ss-short',
  props: [ 'content', 'picList', 'picStr' ],
  methods: {
  },
  components: {
    'photos': SSPhotos
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ques-article01{padding:0.25rem;font-size: 0.3rem;line-height: 0.48rem;color:#646464;}
</style>
