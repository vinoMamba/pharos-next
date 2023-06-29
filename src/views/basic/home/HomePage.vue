<script setup lang="ts">

const handleClick = () => {
  console.log('click');
}
</script>
<template>
  <div class="w-full h-400 bg-red relative">
    <h1 @click="handleClick">loading</h1>
  </div>
</template>
