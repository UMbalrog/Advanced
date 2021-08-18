<template>
  <div>{{name}}
    <div>sad开发拉世纪东福利卡就是的法卡萨</div>
    <div>{{count}}</div>
    <div @click="add">按钮</div>
    <div @click="asyncAdd">按钮async</div>
    <el-button type="primary">
      <router-link to="/shop">Go to Shop</router-link>
    </el-button>
    <div>------------------分割线------------------</div>
    <HelloWorld
      :msg="count"
      @change="childchange"
    ></HelloWorld>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import HelloWorld from '../components/HelloWorld.vue'

const name = 'HOME';
let str = ref('我是子组件参数')

const store = useStore();
let count = computed(() => store.state.count);

let add = () => store.commit('increment');

let asyncAdd = () => store.dispatch('actionsincrement');

let childchange = () => {

}

</script>

<style>

</style>
