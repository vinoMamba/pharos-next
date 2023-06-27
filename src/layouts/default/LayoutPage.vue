<script setup lang="ts">
import {Layout} from "ant-design-vue";
import {RouterView} from "vue-router"
import PharosHeader from "./header/PharosHeader.vue"
import PharosSider from "./sider/PharosSider.vue";

const {Content} = Layout
</script>
<template>
  <Layout class="h-full w-full">
    <PharosSider />
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
