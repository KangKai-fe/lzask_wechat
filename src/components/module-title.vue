<template>
  <div class="com_title01" style="border-top:none">
    <h3>{{ title }}</h3>
  </div>
</template>

<script>
export default {
  name: 'ss-module-title',
  props: [ 'title' ]
}
</script>

<style scoped>
.com_title01 {width: auto;margin:0 0.3rem;border-top:0.01rem solid  #e1e1e1;font-size: 0.32rem;padding:0.3rem 0;}
.com_title01 h3 {position: relative;padding-left:0.23rem;}
.com_title01 h3:before {content:'';width: 0.1rem;height: 0.3rem;background-color:#323232;border-radius: 0.1rem;display: block;position: absolute;left:0;top:0.09rem;}
</style>
