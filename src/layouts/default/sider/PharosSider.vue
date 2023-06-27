<script setup lang="ts">
import {Layout} from "ant-design-vue";
import {PharosMenu} from "/@/components/Menu";
import {useMenuSetting} from "/@/hooks/useMenuSetting";
import {AppLogo} from "/@/components/App"
import {useLayoutMenu} from "./useLayoutMenu";
import {useGo} from "/@/hooks/usePage";

const {Sider} = Layout;
const go = useGo()
const {collapsed, menuWidth} = useMenuSetting();
const {menusRef} = useLayoutMenu()

const handleMenuItemClick = (key: string) => {
  go(key)
};

</script>
<template>
  <Sider collapsible :width="menuWidth" :collapsed="collapsed" theme="dark" :trigger="null" :collapsed-width="48">
    <AppLogo :show-title="!collapsed" />
    <PharosMenu :items="menusRef" @menu-click="handleMenuItemClick" />
  </Sider>
</template>
