<script setup lang="ts">
import {RouterView} from "vue-router"

</script>
<template>
  <RouterView>
    <template #default="{Component, route}">
      <!-- TODO: Add transition -->
      <Transition>
        <component :is="Component" :key="route.fullPath" />
      </Transition>
    </template>
  </RouterView>
</template>
