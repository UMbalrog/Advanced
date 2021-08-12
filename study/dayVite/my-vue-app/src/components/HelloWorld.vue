<template>
  <div>
    <h1>{{ msg }}</h1>
    <div class="number">数字{{state.count}}</div>
    <div class="btn" @click="setCount">按钮</div>
  </div>
</template>

<script setup>
import { defineProps, reactive, onBeforeMount } from 'vue';

defineProps({
  msg: String,
  stat: Number
})
let age = 60;

const state = reactive({ count: 0 });
const list = reactive([
  {
    name: "张三",
    age: 80
  }
]);
const setCount = () => {
  state.count ++;
}

const autoPush = () => {
  console.log(age)
  setTimeout(() => {
    list.push({
      name: "赵六",
      age: age++
    });
    // autoPush();
  },2000)
}

onBeforeMount(() => {
  autoPush();
})



// 组件分割

</script>

<style lang="less" scoped>
a {
  color: #42b983;
}
.number{
  font-size: 18px;
  color: #42b983;
}
.btn{
  width: 80px;
  height: 36px;
  background-color: antiquewhite;
  line-height: 38px;
  text-align: center;
  border-radius: 5px;
}
</style>
