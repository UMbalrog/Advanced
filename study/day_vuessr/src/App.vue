<template>
  <div id="app">
    <div>hello world123</div>
    <div>{{message}}</div>
    <input type="text" v-model="message">
    <div @click="onClick">点击</div>
  </div>
</template>
<script>
export default {
  name:'App',
  data() {
    return {
      message:'测试文案哈哈哈哈'
    }
  },
  methods: {
    onClick () {
      console.log('Hello World!')
    }
  }
}
</script>

