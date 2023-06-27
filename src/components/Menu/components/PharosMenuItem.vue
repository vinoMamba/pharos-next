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
  <Menu.Item :key="item.path" style="display: flex; align-items: center;">
    <template #icon>
      <div :class="item.icon" style="flex-shrink: 0;"></div>
    </template>
    <PharosMenuContent :item="item" />
  </Menu.Item>
</template>
