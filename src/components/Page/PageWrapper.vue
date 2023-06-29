<script setup lang="ts">
import {PageHeader} from "ant-design-vue";
import {computed} from "vue";

const slots = defineSlots()

const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  subTitle: {
    type: String,
    default: ""
  },
  content: {
    type: String,
    default: ""
  },
  dense: {
    type: Boolean,
    default: false
  },
  ghost: {
    type: Boolean,
    default: false
  },
})

const contentStyle = computed(() => {
  return {
    "padding": props.dense ? "0" : "16px",
  }
})

const showHeader = computed(() => {
  return props.title || props.subTitle || props.content || slots.headerContent || slots.extra
})

</script>
<template>
  <div>
    <PageHeader :title="title" :sub-title="subTitle" class="bg-white" :ghost="ghost" v-if="showHeader">
      <template #default>
        <template v-if="content">{{ content }}</template>
        <slot name="headerContent" v-else />
      </template>
      <template #extra>
        <slot name="extra" />
      </template>
    </PageHeader>
    <div :style="contentStyle">
      <slot />
    </div>
  </div>
</template>
