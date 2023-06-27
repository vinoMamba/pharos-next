<script setup lang="ts">
import {AppProvider} from './components/App';
import {RouterView} from 'vue-router';

</script>

<template>
  <AppProvider>
    <RouterView />
  </AppProvider>
</template>

