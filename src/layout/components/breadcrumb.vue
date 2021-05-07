<template>
  <a-breadcrumb>
    <template v-for="(item, index) in state.list" :key="index">
      <a-breadcrumb-item v-if="index == state.list.length - 1">
        {{ item.meta.title }}
      </a-breadcrumb-item>
      <a-breadcrumb-item v-else>
        <router-link :to="`${item.path}`">
          {{ item.meta.title }}
        </router-link>
      </a-breadcrumb-item>
    </template>
  </a-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, watchEffect } from 'vue';
import { Breadcrumb } from 'ant-design-vue';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  name: 'Breadcrumb',
  components: {
    [Breadcrumb.name]: Breadcrumb,
    [Breadcrumb.Item.name]: Breadcrumb.Item,
    [Breadcrumb.Separator.name]: Breadcrumb.Separator,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      list: [],
    });
    watchEffect(() => {
      state.list = [];
      router.currentRoute.value.matched.forEach((item) => {
        if (item.meta && item.meta.title) {
          (state.list as any[]).push(item);
        }
      });
    });
    return {
      state,
    };
  },
});
</script>

<style lang="scss" scoped>
.ant-breadcrumb {
  float: left;
}
</style>
