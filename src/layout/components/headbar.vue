<template>
  <a-layout-header class="headbar">
    <menu-unfold-outlined
      v-if="sidebar.collapsed"
      class="trigger"
      @click="handleToggleSidebar"
    />
    <menu-fold-outlined v-else class="trigger" @click="handleToggleSidebar" />
    <breadcrumb></breadcrumb>
    <a-dropdown class="header-avatar">
      <a class="ant-dropdown-link" @click.prevent>
        <a-avatar :size="30" v-if="avatar"><img src="avatar" /></a-avatar>
        <a-avatar :size="30" v-else>
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <DownOutlined style="margin-left: 5px" />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a href="javascript:;">个人中心</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">退出登录</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </a-layout-header>
</template>

<script>
import { defineComponent } from 'vue';
import { Layout, Menu, Avatar, Dropdown } from 'ant-design-vue';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  DownOutlined,
} from '@ant-design/icons-vue';
import { mapGetters, useStore } from 'vuex';
import Breadcrumb from '../components/breadcrumb';

export default defineComponent({
  components: {
    [Layout.name]: Layout,
    [Layout.Header.name]: Layout.Header,
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item,
    [Avatar.name]: Avatar,
    [Dropdown.name]: Dropdown,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    DownOutlined,
    Breadcrumb,
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'avatar']),
  },
  setup() {
    const store = useStore();
    const token = store.state.user.token;
    const handleToggleSidebar = () => {
      store.dispatch('toggleSidebar');
    };
    store.dispatch('getUserInfo');

    return {
      token,
      handleToggleSidebar,
    };
  },
});
</script>

<style scoped lang="scss">
.headbar {
  background: #fff;
  padding: 0 0 0 20px;
  display: flex;
  align-items: center;
}
.anticon {
  font-size: 18px;
  &:hover {
    color: #1890ff;
  }
}
.ant-breadcrumb {
  flex: 1;
  margin-left: 10px;
}
.header-avatar {
  padding-right: 20px;
  color: #666;
}
</style>
