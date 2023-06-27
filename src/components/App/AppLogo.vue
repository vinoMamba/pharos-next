<script setup lang="ts">
import s from "/@/assets/logo.png";
import {useGlobSetting} from "/@/hooks/useGlobSetting";

defineProps({
  showTitle: Boolean
});

const {title} = useGlobSetting();

</script>
<template>
  <div class="flex items-center h-48 cursor-pointer p-10 px-8">
    <img :src="s" alt="" class="w-32 h-32" />
    <h1 class="text-white m-0 ml-2 truncate xs:opacity-0" v-if="showTitle">{{ title }}</h1>
  </div>
</template>
