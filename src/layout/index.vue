<template>
  <div class="wrapper">
    <a-layout>
      <sidebar></sidebar>
      <a-layout>
        <headbar></headbar>
        <app-main></app-main>
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Sidebar from './components/sidebar.vue';
import Headbar from './components/headbar.vue';
import AppMain from './components/app-main.vue';
import { Layout } from 'ant-design-vue';

export default defineComponent({
  components: {
    Sidebar,
    Headbar,
    AppMain,
    [Layout.name]: Layout,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="sass" scoped></style>
