<script setup lang="ts">
import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons-vue';
import {ref} from 'vue';

const getCollapsed = ref(false);
</script>
<template>
  <span class="flex h-full px-10 pt-1 items-center hover:bg-#f6f6f6 cursor-pointer">
    <MenuUnfoldOutlined v-if="getCollapsed" />
    <MenuFoldOutlined v-else />
  </span>
</template>
