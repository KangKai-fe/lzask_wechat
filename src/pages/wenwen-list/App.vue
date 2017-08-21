<template>
  <div>
    <div class="hot_users">
      <module-title title="热门答主"></module-title>

      <div class="user_container">
        <ul class="clearfix">
          <li v-for="user in usersList" :key="user.ID"><a href="javascript: void(0);">
            <span class="ww-img01"><lazy-img :src="user.photo" alt="user.photoStr"></lazy-img></span>
            <h3 class="ww-txt01">{{ user.showName }}</h3>
          </a></li>
          <li @click="checkMoreUser"><a href="javascript: void(0);">
            <span class="ww-img01 user_more" style="">more</span>
            <h3 class="ww-txt01">更多答主</h3>
          </a></li>
        </ul>
      </div>
    </div>

    <div class="hot_questions">
      <module-title title="热门问题"></module-title>
      <question class="question"
        v-for="(question, index) in questionsList"
        :class="{ 'first_question': index === 0 }"
        :key="question.questionID"
        :questionInfo="question"
      ></question>

      <div class="readMore" @click="showMore">
        <a href="javascript: void(0);">更多问题</a>
      </div>
    </div>
  </div>
</template>

<script>
/* custom component */
import ModuleTitle from '../../components/module-title.vue'
import hotQuestion from '../../components/wenwen-hot-question.vue'
import LazyImg from '../../components/common-lazy-img.vue'

export default {
  name: 'app',
  data () {
    return {
      dataList: [],
      usersList: [],
      questionsList: [],
      listAllLoaded: false,
      topStatus: ''
    }
  },
  methods: {
    checkMoreUser () {
      location.href = 'find-users.html'
    },
    showMore () {
      location.href = 'question-list.html'
    }/* ,
    handleTopChange (status) {
      this.topStatus = status
    },

    listLoadTop () {
      const firstItemId = this.dataList[0].id
      setTimeout(() => {
        for (let i = firstItemId; i > firstItemId - 5; i--) {
          this.dataList.unshift({ id: i - 1 })
        }
        this.$refs.loadmoreItems.onTopLoaded()
      }, 1000)
    },

    listLoadBottom () {
      this.$http.get('/topic/listHistory')
        .then(res => {
          if (res.resultCode === 200) {
            this.dataList = this.dataList.concat(res.object)
          }
          this.$refs.loadmoreItems.onBottomLoaded()
        })
        .catch(err => {
          console.log('err', err)
          this.$refs.loadmoreItems.onBottomLoaded()
        })
    } */
  },
  created () {
    this.$http.get('/userInfo/listHotUser')
      .then(res => {
        if (res.resultCode === 200) {
          this.usersList = res.object
        }
      })
      .catch(err => {
        console.log('------------- err -------------', err)
      })
    this.$http.get('/homepage/partBottom', {
      params: {
        pageSize: 10
      }
    })
      .then(res => {
        if (res.resultCode === 200) {
          this.questionsList = res.object
        }
      })
      .catch(err => {
        console.log('------------- err -------------', err)
      })
  },
  components: {
    'module-title': ModuleTitle,
    'question': hotQuestion,
    'lazy-img': LazyImg
  }
}
</script>

<style scoped>
.hot_users,
.hot_questions {
  background: #fff;
}

.hot_questions {
  margin-top: 0.3rem;
}

.first_question {
  padding-top: 0 !important;
}

.user_container {
  width: 100%;
  overflow: scroll;
  padding-left: 0.25rem;
  -webkit-overflow-scrolling: touch;
}

.user_container ul {
  width: 300%;
}

.user_container li {
  padding-right: 0.39rem;
  width: 1.2rem;
  float: left;
}

.ww-img01 {
  width: 1.2rem;
  height: 1.2rem;
  display: block;
  border-radius: 1.2rem;
  overflow: hidden;
}

.user_more {
  font-size: 0.28rem;
  text-align: center;
  line-height: 1.2rem;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.ww-txt01 {
  font-size: 0.28rem;
  padding: 0.2rem 0;
  width: 1.2rem;
  text-align: center;
  font-weight: normal;
  white-space: nowrap;
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
  background: url(../../assets/img/more_bg.png) no-repeat left center;
  font-size: 0.3rem;
  width: 1.27rem;
  color: #646464;
  background-size: 0.32rem;
}

</style>
