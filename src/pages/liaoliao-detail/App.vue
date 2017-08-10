<template>
  <div>
    <!-- liaoliao content -->
    <ll-detail :llInfo="llDetail"></ll-detail>

    <!-- comment list -->
    <comments :commentsList="commentsList"></comments>
  </div>
</template>

<script>
/* tools */
import { querystring } from 'vux'

/* custom component */
import LLDetail from '../../components/liaoliao-detail.vue'
import LLComments from '../../components/liaoliao-comments.vue'

export default {
  name: 'app',
  data () {
    return {
      topicID: '',
      llDetail: {},
      commentsList: []
    }
  },
  computed: {
  },
  methods: {
  },

  created () {
    // liaoliao id
    const topicID = querystring.parse().topicID
    this.topicID = topicID
    console.log(topicID)

    /* liaoliao detail */
    this.$http.get('/topic/detail', {
      params: {
        topicID: topicID
      }
    })
      .then(res => {
        let resData = JSON.parse(JSON.stringify(res))
        // console.log(resData)
        console.log('liaoliao detail loaded')
        if (resData.resultCode === 200) {
          this.llDetail = resData.object
        }
      })
      .catch(err => {
        console.log('err', err)
      })

    /* comments */
    this.$http.get('/discuss/list', {
      params: {
        topicID: topicID
      }
    })
      .then(res => {
        let resData = JSON.parse(JSON.stringify(res))
        // console.log(resData)
        console.log('liaoliao detail loaded')
        if (resData.resultCode === 200) {
          this.commentsList = resData.object
        }
      })
      .catch(err => {
        console.log('err', err)
      })
  },

  components: {
    'll-detail': LLDetail,
    'comments': LLComments
  }
}
</script>

<style>
/*晒晒正文短*/
.question01{background-color:#fff;}

.message{background-color:#fff;box-shadow: -1px 5px 10px #c2c2c2;padding:0.1rem 0.25rem;width: auto;overflow: hidden;}
.message textarea{background:none;width: 100%;min-height: 1.1rem;border:none;background:url(../../assets/img/message_bg.png) no-repeat right center;display: block;color:#bcbcbc;background-size: 0.48rem;}
</style>
