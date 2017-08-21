<template>
  <img :src="showSrc" :alt="alt || '用户头像'">
</template>

<script>
export default {
  name: 'lazy-img',
  props: [ 'src', 'alt', 'type' ],
  data () {
    return {
      showSrc: ''
    }
  },
  methods: {
    imgLoaded () {
      this.showSrc = this.src
    }
  },
  created () {
    // init image placeholder
    switch (this.type) {
      case 0:
        this.showSrc = 'http://via.placeholder.com/325x163.png'
        break
      case 1:
        this.showSrc = 'http://via.placeholder.com/100x100.png'
        break
      default:
        this.showSrc = '../../static/img/default_avatar.png'
        break
    }

    // load real image src
    let lazyImg = new Image()
    lazyImg.src = this.src
    lazyImg.onload = this.imgLoaded
  }
}
</script>

<style scoped>
</style>
