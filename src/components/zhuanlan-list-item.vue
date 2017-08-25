<template>
  <div class="zl_item">
    <a href="#">
      <div class="zl_txt">
        <div class="zlTxt_con">
          <h3>
            {{ title }}
          </h3>
          <p>
            <span>
              <i v-if="official">官</i>{{ date }}</span>
            <strong>{{ viewCount }}人看过</strong>
          </p>
        </div>
      </div>
      <div class="zl_img">
        <img :src="imgUrl" alt="">
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'zl-list-item',
  props: {
    title: {
      type: String,
      default: '专栏标题'
    },
    official: {
      type: Boolean,
      default: true
    },
    date: {
      type: String,
      default: '2017年6月16日'
    },
    viewCount: {
      type: Number,
      default: 0
    },
    imgUrl: {
      type: String,
      default: '../../static/img/zl01.png'
    }
  }
}
</script>

<style scoped>
  .zl_list{width:auto;overflow: hidden;padding:0.3rem 0.25rem;}
  .zl_item{width: auto;overflow: hidden;margin-bottom: 0.2rem;border-radius: 0.1rem;background-color:#fff;}
  .zl_txt{width: 100%;float:left;}
  .zlTxt_con{margin-right: 2.2rem;padding:0.15rem 0.25rem 0;width: auto;overflow: hidden;}
  .zlTxt_con h3{font-size: 0.3rem;line-height: 0.39rem;height: 0.78rem;overflow: hidden;padding-top:0.05rem;}
  .zlTxt_con p{font-size: 0.26rem;color:#969696;padding-top: 0.1rem;height: 0.4rem;line-height: 0.4rem;}
  .zlTxt_con p span{color:#969696;float:left}
  .zlTxt_con p span i{font-style: normal;border-radius: 0.02rem;background-color:#80aedc;font-size: 0.24rem;color:#fff;text-align: center;padding:0.02rem 0.04rem;margin-right: 0.1rem;}
  .zlTxt_con p strong{color:#969696;float:right;}
  .zl_img{width: 2.2rem;height: 1.6rem;position: relative;float:right;margin-left: -2.2rem;}
</style>
