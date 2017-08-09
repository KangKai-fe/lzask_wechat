<template>
  <div class="c-bottom01 ss-bottom01">
    <span class="times01"><i class="iconfont">&#xe628;</i>{{ timeFromNow }}</span>
    <span class="listen"><i class="iconfont">&#xe603;</i>{{ viewCount }}</span>
    <span class="heart"
      :class="{ active: isZan }"
      @click.stop="zan"
    >
      <i class="iconfont">&#xe6a2;</i>{{ zanCountLocale }}
    </span>
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('zh-cn')

export default {
  name: 'ss-status',
  props: [ 'createDate', 'viewCount', 'zanCount', 'zanStatus' ],
  data () {
    return {
      isZan: this.zanStatus,
      zanCountLocale: this.zanCount,
      timeFromNow: moment(this.createDate).fromNow()
    }
  },
  methods: {
    zan () {
      if (this.isZan) {
        return
      }
      // TODO ajax
      // $emit zan
      this.isZan = 1
      this.zanCountLocale++
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ss-bottom01{padding:0 0.25rem 0.3rem;width: auto;}
</style>
