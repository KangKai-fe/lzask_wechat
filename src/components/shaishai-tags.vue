<template>
  <div class="tags">
    <span v-for="(tag, index) in tags"
      :key="index"
    >#{{ tag }}</span>
  </div>
</template>

<script>
export default {
  name: 'ss-tags',
  props: [ 'tagStr' ],
  data () {
    return {
      tags: this.tagStr.split(',')
    }
  }
}
</script>

<style scoped>
.tags {font-size: 0.3rem;padding:0.2rem 0.25rem;}
.tags span {color:#80aedc;margin-right: 0.23rem;}
.tags strong {color:#ff8888;margin-right: 0.23rem;}
</style>
