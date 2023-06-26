<script setup lang="ts">
import {Layout} from "ant-design-vue";
import {UserDropdown, TriggerButton} from "./components";

const {Header} = Layout;
</script>
<template>
  <Header class="bg-white flex items-center justify-between" style="padding: 0; height: 48px; line-height: 48px;">
    <div class="flex h-full items-center">
      <TriggerButton />
    </div>
    <div>
      <UserDropdown />
    </div>
  </Header>
</template>
