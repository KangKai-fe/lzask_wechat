<template>
  <div>
    <!-- 热门用户 -->
    <users v-if="hotUsers.length"
     :type="'hot'"
     :usersList="hotUsers"
    ></users>

    <!-- 新晋用户 -->
    <users v-if="newUsers.length"
     :type="'new'"
     :usersList="newUsers"
    ></users>
  </div>
</template>

<script>
import UsersList from '../../components/users-list.vue'

export default {
  name: 'app',
  data () {
    return {
      hotUsers: [],
      newUsers: []
    }
  },

  created () {
    this.$http.get('/userInfo/listHotAndNew')
      .then(res => {
        if (res.resultCode === 200) {
          this.hotUsers = res.object.listHotUser
          this.newUsers = res.object.listNewUser
        }
      })
      .catch(err => {
        console.log('err', err)
      })
  },

  components: {
    'users': UsersList
  }
}
</script>

<style>
.question01 {
  background-color: #fff;
}

.comments {
  margin-top: 0.25rem;
}
</style>
