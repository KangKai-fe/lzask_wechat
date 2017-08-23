<template>
  <div class="container" @click="checkDetail">
      <img class="photo" :src="photo" :alt="photoName">
      <h3 class="title">{{ jjTitle }}</h3>
      <div class="status">
          <span class="time">总时长{{ totalDuration }}min</span>
          <span class="view">参与人数 {{ viewCount }}</span>
      </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'userinfo-brief',
  props: {
    subjectID: String,
    photo: String,
    photoName: String,
    soundTime: Number,
    jjTitle: String,
    viewCount: Number,
    zanCount: Number,
    zanStatus: Number
  },
  computed: {
    totalDuration () {
      const endTime = moment().hour(0).minutes(0).seconds(0).milliseconds(0).add(this.soundTime, 'milliseconds')
      const mins = parseInt(endTime.format('mm'))
      const seconds = parseInt(endTime.format('ss'))
      return mins + '.' + parseInt(seconds / 60 * 10)
    }
  },
  methods: {
    checkDetail () {
      location.href = '/jiangjiang-detail.html?subjectID=' + this.subjectID
    }
  }
}
</script>

<style scoped>

.container {
  padding: 0.3rem 0.25rem;
  border-bottom: 0.02rem solid #ccc;
  overflow: hidden;
  display: block;
  position: relative;
}
.container:last-child {
  border-bottom: none;
}

.photo {
  border-radius: 0.1rem;
}

.title {
  font-size: 0.32rem;
  line-height: 0.44rem;
  font-weight: normal;
  padding: 0.27em 0 0.2rem;
  color: #323232;
}

.status .time {
  font-size: 0.24rem;
  color: #969696;
  float: left;
}

.status .view {
  font-size: 0.24rem;
  color: #969696;
  float: right;
}
</style>
