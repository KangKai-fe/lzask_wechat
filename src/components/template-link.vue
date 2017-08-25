<template>
  <p><a :href="link">{{ pageTitle }}</a></p>
</template>

<script>
export default {
  name: 'template-link',
  props: [ 'pageTitle', 'pageName' ],
  data () {
    return {
      link: './' + this.pageName + '.html'
    }
  }
}
</script>

<style scoped>
</style>
