<script setup lang="ts">
import {Spin} from 'ant-design-vue'
import {ref} from 'vue';
import {useUserStore} from '/@/store/modules/user';
import {onMounted} from 'vue';
import {useMessage} from '/@/hooks/useMessage';

const isLoading = ref(true)
const {notification} = useMessage()
const user = useUserStore()
onMounted(async () => {
  try {
    isLoading.value = true
    const userInfo = await user.login({})
    if (userInfo) {
      notification.success({
        message: '登录成功',
        description: '欢迎回来',
      })
    }
  } catch (e: any) {
    notification.error({
      message: '登录失败',
      description: e.message,
    })
  } finally {
    isLoading.value = false
  }
})

</script>
<template>
  <div class="h-full w-full flex items-center justify-center">
    <Spin tip="登录中..." :spinning="isLoading" size="large" />
  </div>
</template>
