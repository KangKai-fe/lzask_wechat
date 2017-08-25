<template>
  <div :class="{ container_padded: commentable }">
    <!-- shaishai content -->
    <div class="spearkDetail_banner" v-if="jjDetail">
        <img class="jj_photo" :src="jjDetail.photoUrl" alt="">
        <div class="jj-txt02">
            <h3>{{ jjDetail.title }}</h3>
            <p v-if="jjDetail.userInfo">{{ jjDetail.userInfo.showName }}<span>|</span>{{ jjDetail.userInfo.summary }}</p>
        </div>
    </div>

    <!-- author info -->
    <author class="author_info" v-if="jjDetail && jjDetail.userInfo"
      :userID="jjDetail.userInfo.ID"
      :userName="jjDetail.userInfo.showName"
      :userIdentity="jjDetail.userInfo.summary"
      :photo="jjDetail.userInfo.photo"
    ></author>

    <!-- jiangjiang introduction -->
    <div class="gen">
      <h3>简介</h3>
      <p :class="{ 'intro_brief': !introAllShown }">{{ jjDetail.description }}</p>
      <span class="intro_show"
        :class="{ 'intro_hide': introAllShown }"
        @click="introAllShown = !introAllShown"
      ></span>
    </div>

    <!-- audio list -->
    <div class="sections" v-if="jjDetail && audioList.length">
      <div class="section"
        v-for="(section, secIndex) in audioList"
        :key="section.ID"
      >
        <h3 class="section_title"><span>{{ secIndex | sectionIndex }}</span>{{ section.title }}</h3>

        <template v-if="section.childrenList">
          <chapter v-for="(chapter, chapterIndex) in section.childrenList"
            :key="chapter.ID"
            :source="audioUrlPrefix + chapter.fileName.replace(/\.amr/, '.mp3')"
            :chapterName="chapter.title"
            :soundTime="chapter.soundTime"
            :index="chapterIndex"
          ></chapter>
        </template>
      </div>
    </div>

    <!-- comment list -->
    <comments class="comments" v-if="commentsList && commentsList.length"
      :commentsList="commentsList"
      :btnMoreShow="commentsBtnMoreShow"
      :btnReplyShow="commentsBtnReplyShow"
      :replyForbidden="replyForbidden"
      @commentClicked="replyComment"
      @commentCheckMore="getMoreComments"
      @replyBtnClickd="replyComment"
    ></comments>

    <!-- comment area -->
    <comment-area v-if="commentable && jjDetail"
      :subjectID="jjDetail.ID"
      :replyCommentID="replyCommentID"
      :replyPlaceholder="replyPlaceholder"
      @areaBlur="areaBlur"
      @commentSucceed="commentSucceed"
    ></comment-area>
  </div>
</template>

<script>
/* tools */
import { querystring } from 'vux'

/* custom component */
import Author from '../../components/user-info-brief.vue'
import ChapterPlayer from '../../components/jiangjiang-chapter-player.vue'
import SSComments from '../../components/shaishai-comments.vue'
import CommentArea from '../../components/comment-area.vue'

/* mock data */
// import JJDetail from '../../mockdata/jiangjiang-detail-info'
// import JJAudios from '../../mockdata/jiangjiang-detail-audios'
// import JJComments from '../../mockdata/jiangjiang-detail-comments'

export default {
  name: 'app',
  data () {
    return {
      jjDetail: null,
      commentsList: [],
      audioList: [],
      related: {},
      commentable: true,
      subjectID: '',
      replyCommentID: '',
      replyPlaceholder: '',
      commentsBtnMoreShow: false,
      commentsBtnReplyShow: false,
      commentTargetObj: null,
      commentsRequestUrl: '/talkComment/list',
      canPlayAudio: false,
      introAllShown: false,
      replyForbidden: true,
      currentCommentPage: 1
    }
  },
  computed: {
    params () {
      let params = {}
      params.subjectID = this.subjectID || 'a62620660ff044d595b1afa04f62f944'
      params.currentUserID = this.$http.userID
      params.appClient = 3
      params.pageIndex = this.currentCommentPage
      return params
    },
    audioUrlPrefix () {
      return this.jjDetail.audioUrl.replace(/audio/, 'audio_mp3')
    }
  },
  filters: {
    sectionIndex (value) {
      switch (value) {
        case 0:
          return '第一章'
        case 1:
          return '第二章'
        case 2:
          return '第三章'
        case 3:
          return '第四章'
        case 4:
          return '第五章'
        case 5:
          return '第六章'
        default:
          return ''
      }
    }/* ,
    toMp3 (value) {
      console.log(this.audioUrlPrefix + value.replace(/\.amr/, '.mp3'))
      return this.audioUrlPrefix + value.replace(/\.amr/, '.mp3')
    } */
  },
  methods: {
    replyComment (commentID, replyUserName, commentObj) {
      this.replyCommentID = commentID
      this.commentTargetObj = commentObj
      if (replyUserName) {
        this.replyPlaceholder = '回复:' + replyUserName
      } else {
        this.replyPlaceholder = '在这里说点什么吧'
      }
      console.log('target', this.replyCommentID)
    },
    getMoreComments () {
      this.$http.get(this.commentsRequestUrl, {
        params: this.params
      })
        .then(res => {
          if (res.resultCode === 200) {
            this.commentsList = this.commentsList.concat(res.object)
            if (res.object.length < 10) {
              this.commentsBtnMoreShow = false
            }
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    areaBlur () {
      // console.log('father blur')
      // this.replyCommentID = ''
      // this.replyPlaceholder = ''
    },
    commentSucceed (commentRes) {
      let comment = {}
      comment = commentRes
      comment.userInfo = {}
      comment.userInfo.ID = this.$http.userID
      comment.userInfo.showName = this.$http.userName
      comment.userInfo.photo = this.$http.userPhoto
      comment.userInfo.accountBalance = {}
      comment.userInfo.accountBalance.grade = this.$http.userGrade
      if (this.commentTargetObj) {
        comment.parentComment = this.commentTargetObj
      }
      this.commentsList.unshift(comment)
    }
  },

  created () {
    // 讲讲 id
    const subjectID = querystring.parse().subjectID
    this.subjectID = subjectID

    // mock data
    // this.jjDetail = JJDetail
    // this.canPlayAudio = true
    // this.commentsList = JJComments
    // this.audioList = JJAudios

    // /* jiangjiang detail */
    this.$http.get('/talkSubject/detail', {
      params: this.params
    })
      .then(res => {
        if (res.resultCode === 200) {
          this.jjDetail = res.object
          // if (res.object.userID !== this.$http.userID) {
          //   this.commentsBtnReplyShow = true // 显示评论按钮
          // } else {
          //   this.replyForbidden = false
          // }
          // 免费 || 已支付
          if (res.object.price === 0 || (res.object.payStatus && res.object.payStatus.status === 1)) {
            this.canPlayAudio = true
          }
        }
      })
      .catch(err => {
        console.log('err', err)
      })

    /* audio list */
    this.$http.get('/talkSection/list', {
      params: this.params
    })
      .then(res => {
        if (res.resultCode === 200) {
          this.audioList = res.object
        }
      })
      .catch(err => {
        console.log('err', err)
      })

    /* comments */
    this.$http.get(this.commentsRequestUrl, {
      params: this.params
    })
      .then(res => {
        if (res.resultCode === 200) {
          this.commentsList = res.object
          this.currentCommentPage++
          if (this.commentsList.length === 10) {
            this.commentsBtnMoreShow = true
          }
        }
      })
      .catch(err => {
        console.log('err', err)
      })
  },

  components: {
    'author': Author,
    'chapter': ChapterPlayer,
    'comments': SSComments,
    'comment-area': CommentArea
  }
}
</script>

<style scoped>
.spearkDetail_banner {
  width: 100%;
  margin-bottom: 0.2rem;
  overflow: hidden;
  background: #fff;
}

.jj-txt02 {
  width: auto;
  overflow: hidden;
  padding:0.25rem;
  margin-left: 0;
  background-color:#fff;
  min-height: 1.2rem;
}

.jj-txt02 h3 {
  font-size: 0.32rem;
  height: 0.39rem;
  line-height: 0.39rem;
  overflow: hidden;
  padding-top: 0.05rem;
}

.jj-txt02 p {
  color: #969696;
  font-size: 0.28rem;
  padding: 0.05rem 0;
}

.jj-txt02 p span {
  margin: 0 0.2rem;
  color: #969696;
}

/* author info */
.author_info {
  width: auto;
  overflow: hidden;
  padding: 0.25rem !important;
  margin-bottom: 0.2rem;
}

/* introduction */
.gen {
  width: auto;
  overflow: hidden;
  padding: 0.25rem 0.25rem 0;
  background-color: #fff;
  margin-bottom: 0.2rem;
}

.gen h3 {
  font-size: 0.36rem;
  padding-bottom: 0.25rem;
}

.gen p {
  font-size: 0.3rem;
  line-height: 0.48rem;
  /* height: 0.96rem; */
  color: #646464;
  /* multiple line overflow */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.intro_brief {
  -webkit-line-clamp: 2;
}

.intro_show {
  margin: 0.4rem auto 0.38rem;
  display: block;
  width: 0.4rem;
  height: 0.2rem;
  background: url(../../assets/img/icon_show_more.png) no-repeat center center;
  background-size: cover;
}

.intro_hide {
  transform: rotateX(180deg)
}

/* sections */
.sections {
  padding: 0 0.25rem;
  margin-bottom: 0.2rem;
  background-color: #fff;
}

.section {
  width: auto;
  overflow: hidden;
  overflow: hidden;
  padding-top: 0.5rem;
  border-bottom: 0.01rem solid #ccc;
}

.section:last-child {
  border-bottom: none;
}

.section_title {
  font-size: 0.36rem;
  font-weight: bold;
  padding-bottom: 0.2rem;
  position: relative;
  padding-left: 0.27rem;
}

.section_title:before {
  content: '';
  width: 0.07rem;
  height: 0.34rem;
  background-color: #ff8888;
  position: absolute;
  left: 0.02rem;
  top: 0.09rem;
}

.section_title span {
  margin-right: 0.39rem;
}

</style>
