<script setup lang="ts">
import {Spin} from 'ant-design-vue'
import {ref} from 'vue';

const isLodaing = ref(true)
</script>
<template>
  <div class="h-full w-full flex items-center justify-center">
    <Spin tip="登录中..." :spinning="isLodaing" size="large" />
  </div>
</template>
