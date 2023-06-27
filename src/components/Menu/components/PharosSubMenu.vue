<script setup lang="ts">
import type {Menu as MenuItem} from '/@/router/types';
import {computed} from 'vue';
import {Menu} from 'ant-design-vue';
import PharosMenuItem from './PharosMenuItem.vue';


const props = defineProps({
  item: {
    type: Object as PropType<MenuItem>,
    default: () => ({}),
  },
  level: Number,
  theme: String as PropType<'light' | 'dark'>,
  showTitle: Boolean,
  isHorizontal: Boolean,
});

const hasChildren = computed(() => {
  return props.item.children && props.item.children.length > 0;
});

</script>
<template>
  <PharosMenuItem v-if="!hasChildren" :item="item" />
  <Menu.SubMenu v-if="hasChildren" :key="`submenu-${item.path}`">
    <template #title>
      <MenuItemContent v-bind="$props" :item="item" />
    </template>

    <template v-for="childrenItem in item.children || []" :key="childrenItem.path">
      <PharosMenuItem v-bind="$props" :item="childrenItem" />
    </template>
  </Menu.SubMenu>
</template>
