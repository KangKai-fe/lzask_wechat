<template>
  <div>
    <!-- shaishai content -->
    <div class="question01">
      <author :userInfo="ssDetail.userInfo"></author>
      <content-long v-if="ssDetail.childrenList.length"
        :title="ssDetail.content"
        :cover="ssDetail.photoUrl"
        :childrenList="ssDetail.childrenList"
      ></content-long>
      <content-short v-if="ssDetail.picList.length"
        :content="ssDetail.content"
        :picList="ssDetail.picList"
        :picStr="ssDetail.picStr"
      ></content-short>
      <tags v-if="ssDetail.tagStr && ssDetail.tagStr !== ''" :tagStr="ssDetail.tagStr"></tags>
      <status
        :createDate="ssDetail.createDate"
        :viewCount="ssDetail.viewCount"
        :zanCount="ssDetail.zanCount"
        :zanStatus="ssDetail.zanStatus"
      ></status>
    </div>

    <!-- related recommend -->
    <related></related>

    <!-- comment list -->
    <comments></comments>
  </div>
</template>

<script>
/* tools */
import { querystring } from 'vux'

/* custom component */
import Author from '../../components/shaishai-author.vue'
import SSLong from '../../components/shaishai-content-long.vue'
import SSShort from '../../components/shaishai-content-short.vue'
import SSStatus from '../../components/shaishai-status.vue'
import SSTags from '../../components/shaishai-tags.vue'
import SSRelated from '../../components/shaishai-related.vue'
import SSComments from '../../components/shaishai-comments.vue'

/* mock data */
// import MockLong from '../../mockdata/shaishai-long'
import MockShort from '../../mockdata/shaishai-short'

export default {
  name: 'app',
  data () {
    return {
      ssDetail: {}
    }
  },
  computed: {
  },
  methods: {
  },

  created () {
    // 晒晒 id
    const baskID = querystring.parse().baskID
    this.baskID = baskID
    console.log(baskID)

    this.ssDetail = MockShort
    // this.ssDetail = MockLong
  },

  components: {
    'author': Author,
    'content-long': SSLong,
    'content-short': SSShort,
    'tags': SSTags,
    'status': SSStatus,
    'related': SSRelated,
    'comments': SSComments
  }
}
</script>

<style>
/*晒晒正文短*/
.question01{background-color:#fff;}

.message{background-color:#fff;box-shadow: -1px 5px 10px #c2c2c2;padding:0.1rem 0.25rem;width: auto;overflow: hidden;}
.message textarea{background:none;width: 100%;min-height: 1.1rem;border:none;background:url(../../assets/img/message_bg.png) no-repeat right center;display: block;color:#bcbcbc;background-size: 0.48rem;}
</style>
