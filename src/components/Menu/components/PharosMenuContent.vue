<script setup lang="ts">
import type {PropType} from 'vue';
import type {Menu} from '/@/router/types';

defineProps({
  item: {
    type: Object as PropType<Menu>,
    default: null,
  },
  showTitle: Boolean,
  level: Number,
  isHorizontal: Boolean
})

</script>
<template>
  <span>
    {{ item.name }}
  </span>
</template>
