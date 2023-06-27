<script setup lang="ts">
import {Menu} from "ant-design-vue";
import type {Menu as MenuItem} from "/@/router/types";
import type {PropType} from "vue";
import PharosMenuContent from "./PharosMenuContent.vue";

defineProps({
  item: {
    type: Object as PropType<MenuItem>,
    default: () => ({}),
  },
  level: Number,
  theme: String as PropType<'light' | 'dark'>,
  showTitle: Boolean,
  isHorizontal: Boolean,
});


</script>
<template>
  <Menu.Item :key="item.path">
    <PharosMenuContent :item="item" />
  </Menu.Item>
</template>
