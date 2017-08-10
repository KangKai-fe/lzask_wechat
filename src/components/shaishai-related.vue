<template>
  <div class="related">
    <module-title title="相关推荐"></module-title>
    <dl class="rel_list01">
        <dt><a href="#"><img :src="relatedList.photo" alt=""></a></dt>
        <dd>{{ relatedList.title }}</dd>
    </dl>
  </div>
</template>

<script>
import ModuleTitle from './module-title.vue'

export default {
  name: 'ss-related',
  props: [ 'relatedList' ],
  components: {
    'module-title': ModuleTitle
  }
}
</script>

<style scoped>
.related{width: auto;}
.rel_list01{margin:0 0.25rem 0.25rem;padding:0.24rem;background-color:#fff;border-radius: 0.1rem;width: auto;overflow: hidden;}
.rel_list01 dt{width:1rem;height: 1rem;float:left;}
.rel_list01 dd{margin-left: 1.23rem;padding-top:0.1rem;font-size: 0.32rem;line-height: 0.44rem;min-height: 0.9rem;}
</style>
