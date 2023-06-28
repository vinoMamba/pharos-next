<script setup lang="ts">
import {ref} from 'vue';
import {useAppStore} from '/@/store/modules/app';
import LoginPwd from './LoginPwd.vue';
import LoginDingtalk from './LoginDingtalk.vue';

const appStore = useAppStore()
const useDingLogin = ref(appStore.getProjectConfig.useDingLogin)
</script>
<template>
  <LoginPwd v-if="!useDingLogin" />
  <LoginDingtalk v-else />
</template>
