<template>
  <div>
    <dl class="userInfo">
        <dt><img :src="userInfo.photo" alt=""></dt>
        <dd>{{ userInfo.showName }}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'ss-author',
  props: [ 'userInfo' ]
}
</script>

<style scoped>
.userInfo {margin:0 0.25rem;width: auto;overflow: hidden;padding-bottom: 0.22rem;border-bottom: 0.01rem solid #e1e1e1;padding:0.25rem 0;}
.userInfo dt {width: 0.72rem;height: 0.72rem;float:left;border-radius: 0.72rem;overflow: hidden;}
.userInfo dd {font-size: 0.3rem;line-height: 0.72rem;height:0.72rem;margin-left: 0.92rem;}
</style>
