<script setup lang="ts">
import {Form, Input, InputPassword, Button} from "ant-design-vue"
import {unref} from "vue";
import {ref} from "vue";
import {reactive} from "vue";
import {useUserStore} from "/@/store/modules/user";
import {useMessage} from '/@/hooks/useMessage';

const {notification} = useMessage()
const userStore = useUserStore()
const formRef = ref()

const formData = reactive({
  username: "",
  password: ""
})

const handleLogin = async () => {
  const form = unref(formRef)
  if (!form) return
  try {
    await form.validate()
    const userInfo = await userStore.loginWithPwd(formData)
    if (userInfo) {
      notification.success({
        message: '登录成功',
        description: '欢迎回来',
      })
    }
  } catch (e: any) {
    if (!Reflect.has(e, "errorFields")) {
      notification.error({
        message: '登录失败',
        description: e.message,
      })
    }
    return
  }
}
</script>
<template>
  <div class="h-full w-full flex items-center justify-center">
    <Form :model="formData" @keypress.enter="handleLogin" ref="formRef">
      <Form.Item name="username" :rules="[{required: true, message: 'Please input your username!'}]">
        <Input v-model:value="formData.username" placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item name="password" :rules="[{required: true, message: 'Please input your password!'}]">
        <InputPassword v-model:value="formData.password" placeholder="请输入密码" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" @click="handleLogin" class="w-full">登 录</Button>
      </Form.Item>
    </Form>
  </div>
</template>
