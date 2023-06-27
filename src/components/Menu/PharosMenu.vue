<script setup lang="ts">
import {Menu} from "ant-design-vue";
import {ref} from "vue";
import type {Menu as MenuItem} from "/@/router/types";
import PharosSubMenu from "./components/PharosSubMenu.vue";

defineProps({
  items: {
    type: Array as PropType<MenuItem[]>,
    required: true
  }
});

const selectedKeys = ref<string[]>([]);
const defaultSelectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);

</script>
<template>
  <Menu :selected-keys="selectedKeys" :default-selected-keys="defaultSelectedKeys" :open-keys="openKeys"
    :sub-menu-open-delay="0.2" theme="dark">
    <template v-for="item in items" :key="item.path">
      <PharosSubMenu :item="item" />
    </template>
  </Menu>
</template>
