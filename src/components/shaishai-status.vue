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
  props: [ 'createDate', 'viewCount', 'zanCount', 'zanStatus', 'baskID', 'discussID', 'questionID' ],
  data () {
    return {
      isZan: this.zanStatus,
      zanCountLocale: this.zanCount || 0,
      requestUrl: ''
    }
  },
  computed: {
    timeFromNow () {
      return moment(this.createDate).fromNow()
    },
    params () {
      let params = {}
      params.userID = this.$http.userID
      params.baskID = this.baskID
      params.discussID = this.discussID
      params.questionID = this.questionID
      return params
    }
  },
  methods: {
    zan () {
      if (this.isZan) {
        return
      }
      this.isZan = true
      this.zanCountLocale++

      if (this.baskID) {
        this.requestUrl = '/bask/zan'
      } else if (this.discussID) {
        this.requestUrl = '/discuss/zan'
      } else if (this.questionID) {
        this.requestUrl = '/question/zan'
      } else {
        return
      }

      // request
      this.$http.get(this.requestUrl, {
        params: this.params
      })
        .then(res => {
          if (res.resultCode !== 200) {
            // this.isZan = false
            // this.zanCountLocale--
            console.log(res.resultMsg)
          }
        })
        .catch(err => {
          console.log('err', err)
          this.isZan = false
          this.zanCountLocale--
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ss-bottom01{padding:0 0.25rem 0.3rem;width: auto;}
</style>
