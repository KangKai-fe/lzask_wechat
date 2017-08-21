<template>
  <div class="user">
    <div class="user_img">
      <lazy-img :src="photo" alt=""></lazy-img>
    </div>
    <div class="user_txt">
      <h3>{{ userName }}</h3>
      <h4 class="user_identity">{{ userIdentity || schoolGrade }}</h4>
      <h4>{{ followCount }}个粉丝</h4>
    </div>
    <div v-if="userID && hasFollowed !== undefined" class="user_gz"
      :class="{ 'active': hasFollowed }"
      @click="followOrUnfollowUser"
    ><a href="javascript: void(0);">
      <span v-if="!hasFollowed">+</span>
      <strong v-if="!hasFollowed">关注</strong>
      <strong v-if="hasFollowed">取消</strong>
    </a></div>
  </div>
</template>

<script>
import LazyImg from './common-lazy-img.vue'
export default {
  name: 'userinfo-brief',
  props: {
    userID: String,
    userName: String,
    userIdentity: String,
    schoolGrade: String,
    followCount: Number,
    photo: String,
    followStatus: Number
  },
  data () {
    return {
      hasFollowed: this.followStatus,
      followBtnClickable: true
    }
  },
  computed: {
    params () {
      let params = {}
      params.userFollowID = this.userID
      return params
    }
  },
  methods: {
    followOrUnfollowUser () {
      if (!this.followBtnClickable) {
        return
      }
      this.followBtnClickable = false
      this.hasFollowed = !this.hasFollowed

      this.$http.get('/userInfo/follow', {
        params: this.params
      })
        .then(res => {
          this.followBtnClickable = true
          if (res.resultCode !== 200) {
            this.hasFollowed = !this.hasFollowed
          }
          this.toastShow = true
          this.canReply = true
        })
        .catch(err => {
          this.followBtnClickable = true
          this.hasFollowed = !this.hasFollowed
          console.log('err', err)
        })
    }
  },
  components: {
    'lazy-img': LazyImg
  }
}
</script>

<style scoped>
.user {
  width: auto;
  padding: 0.4rem 0.25rem;
  border-bottom: 0.01rem solid #e1e1e1;
  position: relative;
  display: flex;
  align-items: center;
  background: #fff;
}
.user:last-child {
  border-bottom: none;
}
.user_img {
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  overflow: hidden;
}
.user_img img {
  width: 100%;
  height: 100%;
}
.user_identity {
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.user_txt {
  flex: 1;
  margin: 0 0.23rem 0 0.25rem;
}
.user_txt h3 {
  font-size: 0.3rem;
  line-height: 0.38rem;
  font-weight: normal;
}
.user_txt h4 {
  font-size: 0.26rem;
  line-height: 0.36rem;
  font-weight: normal;
  color: #969696;
}
.user_gz {
  width: 1.18rem;
  height: 0.58rem;
  border: 0.01rem solid #80aedc;
  color: #80aedc;
  line-height: 0.6rem;
  text-align: center;
  border-radius: 0.05rem;
}
.user_gz a {
  display: block;
  width: 100%;
  height: 100%;
  font-size: 0.24rem;
  color: #80aedc;
  text-align: center;
}
.user_gz span {
  color: #80aedc;
  margin-right: 0.05rem;
}
.user_gz strong {
  color: #80aedc;
}
.user_gz.active {
  background-color: #80aedc;
}
.user_gz.active strong, .user_gz.active span {
  color: #fff;
}
</style>
