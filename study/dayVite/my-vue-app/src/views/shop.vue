<template>
  <div>
    <div>{{name}}</div>
    <i class="el-icon-edit"></i>
    <el-button type="primary">主要按钮</el-button>
    <el-color-picker v-model="color1"></el-color-picker>
  </div>
  
</template>

<script setup>
const name = 'SHOP';
const size = 20;
const color = '#000'

</script>

<style>

</style>
