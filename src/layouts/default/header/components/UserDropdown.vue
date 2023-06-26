<script setup lang="ts">
import {Dropdown, Avatar, Menu} from "ant-design-vue";

</script>
<template>
  <Dropdown placement="bottomLeft" class="px-10 cursor-pointer">
    <span class="flex items-center">
      <Avatar size="small" />
      <span class="ml-4">vino</span>
    </span>
    <template #overlay>
      <Menu>
        <Menu.Item key="1">退出登录</Menu.Item>
      </Menu>
    </template>
  </Dropdown>
</template>
