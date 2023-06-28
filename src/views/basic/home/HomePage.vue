<script setup lang="ts">
import {ref} from 'vue';

const loading = ref(false);
const handleClick = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>
<template>
  <div v-loading="loading" @click="handleClick" loading-tip="loading" class="bg-blue relative">
    <h1>Home Page</h1>
  </div>
</template>
