<script setup lang="ts">
import {Layout} from "ant-design-vue";
import {PharosMenu} from "/@/components/Menu";
import type {Menu} from "/@/router/types";
import {ref} from "vue";
import {useMenuSetting} from "/@/hooks/useMenuSetting";

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
  <Sider collapsible :width="menuWidth" :collapsed="collapsed" theme="dark" :trigger="null">
    <PharosMenu :items="items" />
  </Sider>
</template>
