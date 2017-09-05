<template>
  <div class="remarks" :class="{ 'white-remarks': white }">
    <span class="dates">{{ timeFromNow }}</span>
    <div class="remark_bottom">
      <span class="hot">{{ hotCount }}</span>
      <span class="discuss">{{ discussCount }}</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('zh-cn')

export default {
  name: 'll-status',
  props: [ 'publishDate', 'discussCount', 'hotCount', 'white' ],
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
  padding-left: 0.4rem;
  display: inline-block;
  font-size: 0.14rem;
  height: 0.36rem;
  line-height: 0.36rem;
  background-position: left center;
  background-repeat: no-repeat;
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
  margin-left: 0.2rem;
}

.hot {
  margin-right: 0.3rem;
  background-size: 0.3rem 0.36rem;
  background-image: url(../assets/img/icon_hot_black.png);
}

.discuss {
  background-size: 0.3rem 0.33rem;
  background-image: url(../assets/img/icon_discuss_black.png);
}

.white-remarks .hot {
  background-image: url(../assets/img/icon_hot_white.png);
}

.white-remarks .discuss {
  background-image: url(../assets/img/icon_discuss_white.png);
}

.white-remarks .remark_bottom {
  padding-right: 0.2rem;
  font-size: 0
}

</style>
