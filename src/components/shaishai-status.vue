<template>
  <div class="status">
    <span class="time">{{ timeFromNow }}</span>
    <span class="listen">{{ viewCount }}</span>
    <span class="like"
      :class="{ active: isZan }"
      @click.stop="zan"
    >
      {{ zanCountLocale }}
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

.status {
  width: auto;
  padding: 0 0.25rem 0.3rem;
  font-size: 0.24rem;
  text-align: center;
}

.status span {
  color: #80aedc;
  padding-left: 0.48rem;
  height: 0.37rem;
  line-height: 0.37rem;
  background-size: 0.36rem 0.36rem;
  background-position: left center;
  background-repeat: no-repeat;
}

.time {
  float: left;
  background-image: url(../assets/img/icon_time.png);
}

.listen {
  margin: 0 auto;
  background-image: url(../assets/img/icon_view_head.png);
  display: inline-block;
}

.like {
  float: right;
  margin-right: 0.2rem;
  background-image: url(../assets/img/icon_like_circle.png);
}

.like.active {
  color: #ff8888;
  background-image: url(../assets/img/icon_liked_circle.png);
}
</style>
