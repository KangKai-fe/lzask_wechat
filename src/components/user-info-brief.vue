<template>
  <div class="user">
    <div class="user_img">
      <lazy-img :src="photo" alt=""></lazy-img>
    </div>
    <div class="user_txt">
      <h3>{{ userName }}</h3>
      <h4 class="user_identity">{{ userIdentity || schoolGrade }}</h4>
      <h4 v-if="followCount">{{ followCount }}个粉丝</h4>
    </div>
    <div v-if="userID && hasFollowed !== undefined" class="user_gz"
      :class="{ 'active': hasFollowed }"
      @click="followOrUnfollowUser"
    >
      <a v-if="!hasFollowed" href="javascript: void(0);">
        <img v-if="type === 'hot'" src="../assets/img/icon_follow_hot.png" alt="">
        <img v-if="type === 'new'" src="../assets/img/icon_follow_new.png" alt="">
      </a>
      <a v-else href="javascript: void(0);">
        <img src="../assets/img/icon_followed.png" alt="">
        <!-- <icon v-if="hasFollowed" class="followed_icon" type="success-no-circle"></icon> -->
        <!-- <strong v-if="hasFollowed">已关注</strong> -->
      </a>
    </div>
  </div>
</template>

<script>
import LazyImg from './common-lazy-img.vue'
import { Icon } from 'vux'

export default {
  name: 'userinfo-brief',
  props: {
    userID: String,
    userName: String,
    userIdentity: String,
    schoolGrade: String,
    followCount: Number,
    photo: String,
    followStatus: Number,
    type: ''
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
    'lazy-img': LazyImg,
    Icon
  }
}
</script>

<style scoped>
.user {
  width: auto;
  padding: 0.4rem 0.25rem;
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
  width: 1.30rem;
  height: 0.56rem;
  background: #80aedc;
  line-height: 0.56rem;
  text-align: center;
  border-radius: 0.1rem;
}
.user_gz a {
  display: block;
  width: 100%;
  height: 100%;
  font-size: 0.24rem;
  text-align: center;
  color: #fff;
}
.user_gz a img {
  width: 100%;
  height: 100%;
}
.user_gz span {
  margin-right: 0.05rem;
  font-weight: bold;
}
.user_gz strong {
  font-weight: bold;
}
.user_gz.active {
  background: #ccc;
  margin-right: 0;
}
.followed_icon {
  color: #fff;
  font-size: 0.8em;
  font-weight: bold;
  position: relative;
  top: -0.03rem;
}
</style>
