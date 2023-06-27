<script setup lang="ts">
import {Layout} from "ant-design-vue";
import {PharosMenu} from "/@/components/Menu";
import type {Menu} from "/@/router/types";
import {ref} from "vue";
import {useMenuSetting} from "/@/hooks/useMenuSetting";
import {AppLogo} from "/@/components/App"

const {Sider} = Layout;
const items = ref<Menu[]>([
  {
    path: "/",
    name: "Home",
    icon: "home"
  },
  {
    path: "/about",
    name: "About",
    icon: "info-circle"
  }
]);

const {collapsed, menuWidth} = useMenuSetting();


</script>
<template>
  <Sider collapsible :width="menuWidth" :collapsed="collapsed" theme="dark" :trigger="null" :collapsed-width="48">
    <AppLogo :show-title="!collapsed" />
    <PharosMenu :items="items" />
  </Sider>
</template>
