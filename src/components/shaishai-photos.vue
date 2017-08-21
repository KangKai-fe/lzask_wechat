<template>
  <div>
    <!-- 单张 -->
    <a href="javascript: void(0);" v-if="single" class="single_container">
      <img :src="picList[0]" :alt="picStrArr[0]" @click.stop="show(0)">
    </a>
    <!-- 相册 -->
    <ul class="ques-list01" v-else>
      <li v-for="(pic, index) in picList" :key="index" @click.stop="show(index)">
        <a href="javascript: void(0);">
          <span :style="{ backgroundImage: 'url(' + pic + ')' }">
            <img :src="pic" :alt="picStrArr[index]">
          </span>
        </a>
      </li>
    </ul>
    <div v-transfer-dom>
      <previewer :list="photoList" ref="previewer"></previewer>
    </div>
  </div>
</template>

<script>
import { Previewer, TransferDom } from 'vux'

export default {
  name: 'ss-photos',
  props: ['picList', 'picStr', 'single'],
  data () {
    return {
      picStrArr: this.picStr.split(',')
    }
  },
  computed: {
    photoList () {
      let list = []
      this.picList.forEach(function (ele) {
        list.push({ 'src': ele })
      })
      return list
    }
  },
  methods: {
    show (index) {
      this.$refs.previewer.show(index)
    }
  },
  directives: {
    TransferDom
  },
  components: {
    Previewer
  }
}
</script>

<style scoped>
.ques-list01 {
  width: auto;
  overflow: hidden;
  padding: 0.25rem 0.21rem 0.25rem 0.21rem;
}

.ques-list01 li {
  float: left;
  width: 33.333%;
  margin-bottom: 0.08rem;
}

.ques-list01 li a {
  display: block;
  margin: 0 0.04rem;
}

.ques-list01 li span {
  display: block;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  overflow: hidden;
  background-size: cover;
  background-position: center center;
}

.ques-list01 img {
  visibility: hidden;
}
.single_container {
  display: block;
  max-height: 4rem;
  overflow: hidden;
}
</style>
