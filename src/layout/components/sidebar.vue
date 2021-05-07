<template>
  <a-layout-sider
    class="sidebar"
    collapsible
    v-model:collapsed="sidebar.collapsed"
    :trigger="null"
  >
    <div class="logo">Ant-Admin</div>
    <a-menu
      theme="dark"
      mode="inline"
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
    >
      <menu-item
        v-for="route in menuList"
        :key="route.name"
        :item="route"
        :base-path="route.path"
      ></menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Layout, Menu } from 'ant-design-vue';
import { mapGetters } from 'vuex';
import MenuItem from './menu-item.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    [Layout.name]: Layout,
    [Layout.Sider.name]: Layout.Sider,
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item,
    MenuItem,
  },
  computed: {
    ...mapGetters(['sidebar', 'menuList']),
  },
  setup() {
    const selectedKeys = ref<string[]>([]);
    const openKeys = ref<string[]>([]);
    const router = useRouter();
    const routeNameArr: any[] = router.currentRoute.value.matched.map(
      (item) => {
        return item.name;
      },
    );
    routeNameArr.shift();
    selectedKeys.value.push(routeNameArr[routeNameArr.length - 1]);
    openKeys.value = routeNameArr.splice(0, routeNameArr.length - 1);

    return {
      selectedKeys,
      openKeys,
    };
  },
});
</script>

<style scoped lang="scss">
.sidebar {
  height: 100vh;
}
.logo {
  margin: 10px;
  text-align: center;
  line-height: 44px;
  color: #fff;
}
</style>
