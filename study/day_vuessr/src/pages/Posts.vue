<template>
  <div>
    <h1>Post List</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'PostList',
  metaInfo: {
    title: 'Posts'
  },
  data () {
    return {
      // posts: []
    }
  },
  computed: {
    ...mapState(['posts'])
  },
  // 服务端预取函数，只会在服务端执行
  // Vue SSR 特殊为服务端渲染提供的一个生命周期钩子函数
  serverPrefetch () {
    // 发起 action，返回 Promise
    // this.$store.dispatch('getPosts')
    return this.getPosts();
  },
  methods: {
    ...mapActions(['getPosts'])
  }
}
</script>

