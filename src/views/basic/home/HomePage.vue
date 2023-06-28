<script setup lang="ts">
import {ref} from 'vue';
import {useLoading} from '/@/components/Loading';

const divRef = ref<HTMLElement | null>(null)

const [open, close] = useLoading({
  target: divRef,
  props: {
    tip: 'loading'
  }
})
const handleClick = () => {
  open()
  setTimeout(() => {
    close()
  }, 2000)
}
</script>
<template>
  <div class="w-full h-400 bg-red relative" ref="divRef">
    <h1 @click="handleClick">loading</h1>
  </div>
</template>
