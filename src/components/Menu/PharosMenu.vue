<script setup lang="ts">
import {Menu} from "ant-design-vue";
import {ref} from "vue";
import type {Menu as MenuItem} from "/@/router/types";
import PharosSubMenu from "./components/PharosSubMenu.vue";
import type {MenuInfo} from "ant-design-vue/lib/menu/src/interface";

const emit = defineEmits(['menuClick']);

defineProps({
  items: {
    type: Array as PropType<MenuItem[]>,
    required: true
  }
});

const selectedKeys = ref<string[]>([]);
const defaultSelectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);

const handleClick = ({key}: MenuInfo) => {
  emit('menuClick', key);
  selectedKeys.value = [key as string];
};

</script>
<template>
  <Menu :selected-keys="selectedKeys" :default-selected-keys="defaultSelectedKeys" :open-keys="openKeys"
    :sub-menu-open-delay="0.2" theme="dark" @click="handleClick" mode="inline">
    <template v-for="item in items" :key="item.path">
      <PharosSubMenu :item="item" />
    </template>
  </Menu>
</template>
