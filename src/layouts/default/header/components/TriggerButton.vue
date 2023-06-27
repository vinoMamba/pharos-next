<script setup lang="ts">
import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons-vue';
import {useMenuSetting} from '/@/hooks/useMenuSetting';

const {collapsed, toggleCollapsed} = useMenuSetting();

</script>
<template>
  <span class="flex h-full px-10 pt-1 items-center hover:bg-#f6f6f6 cursor-pointer" @click="toggleCollapsed">
    <MenuUnfoldOutlined v-if="collapsed" />
    <MenuFoldOutlined v-else />
  </span>
</template>
