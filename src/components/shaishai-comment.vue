<template>
  <dl class="com02-word">
    <dt class="photo_container">
      <img :src="comment.userInfo.photo || '../../static/img/default_avatar.png'" alt="用户头像">
      <span class="grade" v-if="comment.userInfo.accountBalance">Lv.{{ comment.userInfo.accountBalance.grade }}</span>
    </dt>
    <dd>
      <span class="zan02 zan" :class="{ active: isZan }" @click.stop="zan()">{{ zanCountLocale }}
        <i class="iconfont">&#xe611;</i>
      </span>
      <h3 class="name02" v-if="comment.parentComment">
        <span class="app-txt01">
          {{ comment.userInfo.showName }}
        </span>
        <span class="app-txt02">回复</span>
        <span class="app-txt01">
          {{ comment.parentComment.userInfo.showName }}
        </span>
      </h3>
      <h3 class="name02" v-else>
        {{ comment.userInfo.showName }}
      </h3>
      <p class="con02">
        {{ comment.content }}
      </p>
      <div class="apply" v-if="comment.parentComment" @click.stop="parentClicked">
        <div class="apply_title" v-if="comment.parentComment.userInfo">
          <span class="app-img photo_container">
            <img :src="comment.parentComment.userInfo.photo || '../../static/img/default_avatar.png'" alt="用户头像">
            <span class="grade small" v-if="comment.parentComment.userInfo.accountBalance">Lv.{{ comment.parentComment.userInfo.accountBalance.grade }}</span>
          </span>
          <span class="app-txt01">{{ comment.parentComment.userInfo.showName }}</span>
        </div>
        <div class="apply_con">
          {{ comment.parentComment.content }}
        </div>
      </div>
    </dd>
  </dl>
</template>

<script>
export default {
  name: 'ss-author',
  props: ['comment'],
  data () {
    return {
      isZan: this.comment.zanStatus,
      zanCountLocale: this.comment.zanCount
    }
  },
  computed: {
    params () {
      let params = {}
      params.commentID = this.comment.ID
      params.userID = this.$http.userID
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

      this.$http.get('/baskComment/zan', {
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
    },
    parentClicked () {
      console.log('reply parent comment')
      this.$emit('parentClicked', this.comment.parentComment.ID, this.comment.parentComment.userInfo.showName, this.comment.parentComment)
    }
  }
}
</script>

<style scoped>
.photo_container img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.photo_container {
  position: relative;
  width: 0.7rem;
  height: 0.7rem;
  float: left;
  border-radius: 0.7rem;
}

.com02-word dd {
  margin-left: 0.97rem;
  position: relative;
}

.com02-word dd .name02 {
  font-size: 0.3rem;
  color: #80aedc;
  height: 0.7rem;
  line-height: 0.7rem;
}

.com02-word dd .name02 i {
  font-family: 'Chaparral Pro';
  color: #ff8888;
  font-size: 0.24rem;
}

.com02-word dd .con02 {
  font-size: 0.3rem;
  line-height: 0.48rem;
  padding-right: 0.25rem;
}

.zan02 {
  position: absolute;
  height: 0.28rem;
  line-height: 0.28rem;
  padding-right: 0.35rem;
  /*background:url(../images/zan02.png) no-repeat right center;*/
  font-size: 0.24rem;
  color: #969696;
  right: 0.25rem;
  top: 0;
  /*background-size: 0.28rem 0.28rem;*/
  line-height: 0.8rem;
  display: block;
  height: 0.7rem;
}

.zan02 i {
  color: #ccc;
  margin-left: 0.1rem;
  float: right;
  margin-top: -0.03rem;
  font-size: 0.28rem
}

.zan02.active {
  color: #ff8888;
  /*background:url(../images/zan02_active.png) no-repeat right center;background-size: 0.28rem 0.28rem;*/
}

.zan02.active i {
  color: #ff8888;
}

.apply {
  border-left: 0.02rem solid #e1e1e1;
  padding-left: 0.28rem;
}

.apply_title {
  padding-right: 0.25rem;
  font-size: 0.24rem;
  height: 0.5rem;
  line-height: 0.5rem;
  padding: 0.15rem 0.25rem 0.15rem 0;
}

.app-img {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 0.25rem;
  margin-right: 0.25rem;
  height: 0.5rem;
  line-height: 0.5rem;
  float: left;
}

.app-txt01 {
  margin-right: 0.25rem;
  color: #80aedc;
  float: left;
}

.app-txt02 {
  color: #323232;
  margin-right: 0.25rem;
  float: left;
}

.apply_con {
  font-size: 0.28rem;
  line-height: 0.48rem;
  color: #646464;
  padding-right: 0.25rem;
}
.grade.small {
  transform: scale(0.4) translate(70%, 90%);
}
</style>
