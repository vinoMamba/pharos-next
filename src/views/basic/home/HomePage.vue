<script setup lang="ts">
import {onMounted} from 'vue';
import {ref} from 'vue';
import {createStorage} from '/@/utils/cache';

const s = createStorage({
  storage: localStorage
});

const dec = ref('');
onMounted(() => {
  s.set('name', "vino", 10)
})



const handleClick = () => {
  console.log('click');
  dec.value = s.get("name")
}
</script>
<template>
  <div class="w-full h-400 bg-red relative">
    <h1 @click="handleClick">loading</h1>
    <h1>{{ dec }}</h1>
  </div>
</template>
