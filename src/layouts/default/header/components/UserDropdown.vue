<script setup lang="ts">
import {Dropdown, Avatar, Menu} from "ant-design-vue";
import {useUserStore} from "/@/store/modules/user";
import {computed} from "vue";
import type {MenuInfo} from "ant-design-vue/lib/menu/src/interface";

const userStore = useUserStore();

const getUserInfo = computed(() => {
  const realname = userStore.getUserInfo.realName;
  const avatar = userStore.getUserInfo.avatar;
  return {
    realname,
    avatar
  }
});

const handleMenuClick = (e: MenuInfo) => {
  switch (e.key) {
    case 'logout':
      userStore.confirmLogout();
      break;
    default:
      break;
  }
}

</script>
<template>
  <Dropdown placement="bottomLeft" class="px-10 cursor-pointer">
    <span class="flex items-center">
      <Avatar size="small" :src="getUserInfo.avatar" />
      <span class="ml-4">{{ getUserInfo.realname }}</span>
    </span>
    <template #overlay>
      <Menu @click="handleMenuClick">
        <Menu.Item key="logout">退出登录</Menu.Item>
      </Menu>
    </template>
  </Dropdown>
</template>
