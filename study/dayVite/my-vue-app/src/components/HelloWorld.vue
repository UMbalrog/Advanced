<template>
  <div>
     <h1>{{ msg }}</h1>
     <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>slide1</swiper-slide>
      <swiper-slide>slide2</swiper-slide>
      <swiper-slide>slide3</swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { defineProps, reactive } from 'vue'
import { Swiper, SwiperSlide } from 'wblive-ui';
import 'swiper/css/swiper.css';
defineProps({
  msg: String,



})

const state = reactive({ count: 0 })


</script>

<style scoped>
a {
  color: #42b983;
}
</style>
