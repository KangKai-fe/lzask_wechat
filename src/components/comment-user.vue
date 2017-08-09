<template>
  <div>
    <div class="c-name01">
      <span class="c-img01"><img :src="userInfo.photo" alt=""></span>
      <h3>{{ userInfo.showName }}<i>L1</i></h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'c-user',
  props: ['userInfo']
}
</script>

<style scoped>
.c-name01{width: auto;overflow: hidden;padding-bottom: 0.38rem}
.c-img01{width: 0.8rem;height: 0.8rem;border-radius: 0.8rem;float:left;overflow: hidden;box-shadow: 0.01rem 0.03rem 0.05rem #b2b2b2}
.c-name01 h3{font-size:0.3rem;margin-left:1rem;height: 0.8rem;line-height: 0.8rem;color:#80aedc;font-weight: normal;}
.c-name01 i{font-family: 'Chaparral Pro';font-weight: bold;font-size: 0.24rem;color:#ff8888;margin-left: 0.2rem;}
</style>
