<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Hello Vue 3 + Vite" :stat="status" />
    <video src="https://plwb01.live.weibo.com/alicdn/4667143549617561.m3u8"></video>
  </div>
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'
const status = 10;


</script>

<style>
*{
  margin:0;
  padding:0;
}
</style>
