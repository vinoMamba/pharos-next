<script setup lang="ts">
import {Layout} from "ant-design-vue";
import {RouterView} from "vue-router"
import PharosHeader from "./header/PharosHeader.vue"

const {Sider, Content} = Layout
</script>
<template>
  <Layout class="h-full w-full">
    <Sider>Sider</Sider>
    <Layout>
      <Content>
        <PharosHeader />
        <RouterView>
          <template #default="{Component, route}">
            <!-- TODO: Add transition -->
            <Transition>
              <component :is="Component" :key="route.fullPath" />
            </Transition>
          </template>
        </RouterView>
      </Content>
    </Layout>
  </Layout>
</template>
