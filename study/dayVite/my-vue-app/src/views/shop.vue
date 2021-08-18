<template>
  <div>
    <div>{{name}}</div>
    <i class="el-icon-edit"></i>
    <el-button type="primary">主要按钮</el-button>
    <el-color-picker v-model="color"></el-color-picker>
    <el-button type="primary">
      <router-link to="/">Go to Home</router-link>
    </el-button>
  </div>
  
</template>

<script setup>
const name = 'SHOP';
const size = 20;
let color = '#000'

</script>

<style>

</style>
