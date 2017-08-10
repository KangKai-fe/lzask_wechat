<template>
  <div>
    <tags class="question_tags"
      v-if="questionInfo.tagStr"
      :tagStr="questionInfo.tagStr"
    ></tags>

    <!-- related recommend -->
    <related></related>

    <!-- comment list -->
    <comments v-if="commentsList.length"
      :commentsList="commentsList"
      :commentsCount="commentsList.length"
    ></comments>
  </div>
</template>

<script>
import { querystring } from 'vux'

/* custom component */
import Tags from '../../components/shaishai-tags.vue'
import SSRelated from '../../components/shaishai-related.vue'
import SSComments from '../../components/shaishai-comments.vue'

export default {
  name: 'app',
  data () {
    return {
      questionInfo: {},
      commentsList: []
    }
  },
  methods: {
    checkMoreUser () {
      console.log('check more users')
    }
  },
  created () {
    const questionID = querystring.parse().questionID
    const userID = '0e86ff252ead4b2596dbe288a66bdd96'
    this.$http.get('/static/api/question/getDetail.json', {
      params: {
        questionID: questionID,
        userID: userID
      }
    })
      .then(res => {
        let resData = JSON.parse(JSON.stringify(res))
        console.log('-------------', resData)
        if (resData.resultCode === 200) {
          this.questionInfo = resData.object
        }
      })
      .catch(err => {
        console.log('------------- err -------------', err)
      })

    /* comments */
    this.$http.get('/static/api/discuss/list.json')
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
    'tags': Tags,
    'related': SSRelated,
    'comments': SSComments
  }
}
</script>

<style scoped>
.question_tags {
  padding: 0.3rem 0.25rem !important;
}

</style>
