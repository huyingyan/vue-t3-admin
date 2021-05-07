<template>
  <a-layout-content>
    <router-view></router-view>
  </a-layout-content>
</template>

<script>
import { defineComponent } from 'vue';
import { Layout } from 'ant-design-vue';

export default defineComponent({
  components: {
    [Layout.name]: Layout,
    [Layout.Content.name]: Layout.Content,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.ant-layout-content {
  margin: 20px;
}
</style>
