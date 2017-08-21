<template>
  <div class="remarks" :class="{ 'white-remarks': white }">
    <span class="dates">{{ timeFromNow }}</span>
    <div class="remark_bottom">
      <span class="hots"><i class="iconfont">&#xe617;</i>{{ hotCount }}</span>
      <span class="view"><i class="iconfont">&#xe618;</i>{{ viewCount }}</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('zh-cn')

export default {
  name: 'll-status',
  props: [ 'publishDate', 'viewCount', 'hotCount', 'white' ],
  data () {
    return {
      isZan: this.zanStatus,
      zanCountLocale: this.zanCount
    }
  },
  computed: {
    timeFromNow () {
      return moment(this.publishDate).fromNow()
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

.remarks {
  width: 100%;
  overflow: hidden;
  height: 0.37rem;
  line-height: 0.37rem;
  padding-bottom: 0.4rem;
}

.dates {
  font-size: 0.24rem;
  color: #000;
  float: left;
}

.remark_bottom {
  float: right;
  font-size: 0.16rem;
}

.remark_bottom span {
  display: inline-block;
  font-size: 0.16rem
}

.white-remarks {
  position: absolute;
  left: 0;
  bottom: 0.2rem;
  padding-bottom: 0;
}

.white-remarks span {
  color: #fff;
  height: 0.42rem;
  line-height: 0.42rem;
}

.white-remarks span.dates {
  margin-left: 0.2rem
}

.white-remarks .hots i {
  color: #fff;
}

.white-remarks .view i {
  color: #fff;
}

.white-remarks .remark_bottom {
  padding-right: 0.2rem;
  font-size: 0
}

</style>
