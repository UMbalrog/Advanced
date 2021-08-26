<template>
  <div>
    <h1>{{ msg }}</h1>
    
    <div class="number">数字{{state.count}}</div>
    <div class="number">数字1{{state1.count}}</div>
    <div class="btn" @click="setCount">按钮</div>

    <div>age{{ age }}</div>
    <div class="btn" @click="setAge">按钮age</div>
    <div>{{ list[0].name }}</div>
  </div>
</template>

<script setup>
import { defineProps, reactive, ref, onBeforeMount } from 'vue';

defineProps({
  msg: String,
  stat: Number
})
let age1 = ref(60);
const setAge1 = () => {
  age1.value++;
}
let age = ref(age1); //使用需要.value，模板中不用
const setAge = () => {
  age.value++;
}

let d = { count: 0 };
const state = reactive(d);

const state1 = reactive(d);

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
  
  setTimeout(() => {
    // list.push({
    //   name: "赵六",
    //   age: age.value++
    // });
    list[0].name = '赵六';
    // autoPush();
  },2000)
}

onBeforeMount(() => {
  autoPush();
  console.log(age.value)
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
