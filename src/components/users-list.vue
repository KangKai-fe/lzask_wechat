<template>
  <div class="users">
    <!-- title -->
    <div class="User_title" :class="{ 'hot': type === 'hot' }">
      <span @click="checkMoreUsers"><a href="javascript: void(0);">显示全部</a></span>
      <h3>
        <i class="iconfont" v-if="type === 'hot'">&#xe608;</i>
        <i class="iconfont" v-else-if="type === 'new'">&#xe61f;</i>
        {{ title }}
      </h3>
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
      location.href = '/user-list.html?type=' + this.type
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
.User_title span {
  float: right;
  background: url(../../static/img/more_bg02.png) no-repeat right center;
  background-size: 0.12rem 0.19rem;
}
.User_title span a {
  color: #909090;
  font-size: 0.24rem;
  height: 0.9rem;
  line-height: 0.9rem;
  display: block;
  padding-right: 0.2rem;
}
.User_title h3 {
  font-size: 0.32rem;
  color: #80aedc;
}
.User_title h3 i {
  font-size: 0.35rem;
  color: #80aedc;
  margin-right: 0.12rem;
}
.User_title.hot h3,
.User_title.hot .iconfont {
  color: #f88;
}
</style>
