<template>
  <div class="users">
    <!-- title -->
    <div class="User_title" :class="{
      'hot': type === 'hot',
      'new': type === 'new'
    }">
      <span class="more" @click="checkMoreUsers">显示全部</span>
      <h3 class="title">{{ title }}</h3>
    </div>

    <!-- user info -->
    <user v-for="user in usersList"
      :key="user.ID"
      :userID="user.ID"
      :userName="user.showName"
      :userIdentity="user.summary"
      :schoolGrade="user.univName && user.grade && (user.univName + user.grade)"
      :followCount="user.followCount"
      :photo="user.photo"
      :followStatus="user.followStatus"
      :type="type"
    ></user>
  </div>
</template>

<script>
import User from './user-info-brief.vue'

export default {
  name: 'users-list',
  props: [ 'type', 'usersList' ],

  computed: {
    title () {
      switch (this.type) {
        case 'hot':
          return '热门用户'
        case 'new':
          return '新晋用户'
        default:
          return '用户'
      }
    }
  },

  methods: {
    checkMoreUsers () {
      // location.href = '/user-list.html?type=' + this.type
      location.href = window.detailPathPrefix + '/user-list?type=' + this.type
    }
  },

  components: {
    'user': User
  }
}
</script>

<style scoped>
.users {
  background: #fff;
  margin-bottom: 0.2rem;
}
.users:last-child {
  margin-bottom: 0;
}
.User_title {
  padding: 0 0.25rem;
  height: 0.9rem;
  line-height: 0.9rem;
  border-bottom: 0.01rem solid #e1e1e1;
}
.more {
  color: #909090;
  font-size: 0.24rem;
  height: 0.9rem;
  line-height: 0.9rem;
  display: block;
  padding-right: 0.3rem;
  float: right;
  background: url(../assets/img/icon_user_more.png) no-repeat right center;
  background-size: 0.2rem 0.32rem;
}
.title {
  font-size: 0.32rem;
  padding-left: 0.7rem;
  background-repeat: no-repeat;
  background-position: left center;
  font-weight: normal;
}
.new .title {
  color: #80aedc;
  background-size: 0.6rem 0.6rem;
  background-image: url(../assets/img/icon_user_new.png);
}
.hot .title {
  color: #f88;
  background-size: 0.51rem 0.6rem;
  background-image: url(../assets/img/icon_user_hot.png);
}
</style>
