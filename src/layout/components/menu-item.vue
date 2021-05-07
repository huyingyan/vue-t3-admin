<template>
  <a-sub-menu v-if="item.meta.hasChildrenInMenu">
    <template v-slot:title
      ><span>{{ item.meta.title }}</span></template
    >
    <menu-item
      v-for="route in item.children"
      :key="route.name"
      :item="route"
      :base-path="basePath + '/' + route.path"
    ></menu-item>
  </a-sub-menu>
  <a-menu-item v-else :key="item.name">
    <router-link :to="{ path: `/${basePath}` }">
      {{ item.meta.title }}
    </router-link></a-menu-item
  >
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Menu } from 'ant-design-vue';

export default defineComponent({
  name: 'MenuItem',
  components: {
    [Menu.name]: Menu,
    [Menu.SubMenu.name]: Menu.SubMenu,
    [Menu.Item.name]: Menu.Item,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
