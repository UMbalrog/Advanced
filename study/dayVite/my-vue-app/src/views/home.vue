<template>
  <div>{{name}}
    <div>sad开发拉世纪东福利卡就是的法卡萨</div>
    <div>{{count}}</div>
    <div @click="add">按钮</div>
    <div @click="asyncAdd">按钮async</div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const name = 'HOME';

const store = useStore();
const count = computed(() => store.state.count);

let add = () => store.commit('increment');

let asyncAdd = () => store.dispatch('actionsincrement');


</script>

<style>

</style>
