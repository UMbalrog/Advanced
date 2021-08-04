<template>
  <div>
    <h1>{{ msg }}</h1>
    <div>数字{{state.count}}</div>
    <div @click="setCount">按钮</div>
    <div>····················</div>
    <div>
      <div v-for="(item, k) in list" :key="k">
        <span>{{item.name}}</span><span>{{item.age}}</span>
      </div>
    </div>

  </div>
</template>

<script setup>
import { defineProps, reactive, onBeforeMount } from 'vue';

defineProps({
  msg: String,
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

</script>

<style scoped>
a {
  color: #42b983;
}
</style>
