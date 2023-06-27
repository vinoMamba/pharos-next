<script setup lang="ts">
import {Layout} from "ant-design-vue";
import PharosHeader from "./header/PharosHeader.vue"
import PharosSider from "./sider/PharosSider.vue";
import PharosContent from "./content/PharosContent.vue";

const {Content} = Layout
</script>
<template>
  <Layout class="h-full w-full">
    <PharosSider />
    <Layout>
      <Content>
        <PharosHeader />
        <PharosContent />
      </Content>
    </Layout>
  </Layout>
</template>
