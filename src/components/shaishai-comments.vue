<template>
  <div class="comment02">
    <div class="com02_title">评论
      <span>{{ commentCount }}</span>
    </div>
    <!-- no comment -->
    <div class="no_comment" v-if="commentCount === 0">
      暂无评论
    </div>
    <!-- comment list -->
    <div v-else>
      <dl class="com02-word">
        <dt>
          <img src="http://115.29.55.231:18886/publish/headicon/1487226111108.jpg" alt="">
        </dt>
        <dd>
          <span class="zan02 zan" @click="zan">2
            <i class="iconfont">&#xe611;</i>
          </span>
          <h3 class="name02">我是西瓦螃
            <i>L1</i>
          </h3>
          <p class="con02">
            往往从一个朴实简单的人物的很小错误或者微小罪行开始。
          </p>
          <div class="apply">
            <div class="apply_title">
              <span class="app-img">
                <img src="http://115.29.55.231:18886/publish/headicon/1487226111108.jpg" alt="">
              </span>
              <span class="app-txt01">阿炎</span>
              <strong class="app-txt02">回复</strong>
              <span class="app-txt01">总是不能瘦的胖</span>
            </div>
            <div class="apply_con">
              科恩兄弟的叙事方法基本上是经典的,但这种经典仅表现在结构上。他们基本上采用顺序叙事,按照开端、发展、结局的传统三幕式结构。
            </div>
          </div>
        </dd>
      </dl>
      <div class="readMore">
        <a href="javascript: void(0);">查看全部</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ss-comment',
  props: ['commentList', 'commentCount'],
  data () {
    return {
    }
  },
  methods: {
    zan () {
      //   if (this.isZan) {
      //     return
      //   }
      //   // TODO ajax
      //   // $emit zan
      //   this.isZan = 1
      //   this.zanCountLocale++
    }
  }
}
</script>

<style scoped>
.comment02 {
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  margin-bottom: 0.15rem;
}

.com02-word {
  width: auto;
  overflow: hidden;
  margin: 0.3rem 0 0 0.25rem;
  border-bottom: 0.01rem solid #e1e1e1;
  padding-bottom: 0.25rem;
}

.com02_title {
  color: #969696;
  font-size: 0.3rem;
  height: 1rem;
  line-height: 1rem;
  border-bottom: 0.01rem solid #e1e1e1;
  width: auto;
  padding: 0 0.25rem;
}

.com02_title span {
  color: #969696;
}

.com02-word dt {
  width: 0.7rem;
  height: 0.7rem;
  float: left;
  border-radius: 0.7rem;
  overflow: hidden;
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
  overflow: hidden;
  margin-right: 0.25rem;
  height: 0.5rem;
  line-height: 0.5rem;
  float: left;
}

.app-txt01 {
  margin-right: 0.25rem;
  color: #80aedc;
  float: left;
  height: 0.5rem;
  line-height: 0.5rem;
}

.app-txt02 {
  margin-right: 0.25rem;
  float: left;
  height: 0.5rem;
  line-height: 0.5rem;
}

.apply_con {
  font-size: 0.28rem;
  line-height: 0.48rem;
  color: #646464;
  padding-right: 0.25rem;
}

.readMore {
  text-align: center;
  height: 1rem;
  line-height: 1rem;
}

.readMore a {
  display: block;
  margin: 0 auto;
  padding-left: 0.53rem;
  background: url(../assets/img/more_bg.png) no-repeat left center;
  font-size: 0.3rem;
  width: 1.27rem;
  color: #646464;
  background-size: 0.32rem;
}

.no_comment {
  text-align: center;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.3rem;
  text-align: center;
}
</style>
