<script setup lang="ts">
import {Spin} from 'ant-design-vue'
import {ref} from 'vue';

const isLodaing = ref(true)
</script>
<template>
  <Spin tip="登录中..." :spinning="isLodaing" />
</template>
