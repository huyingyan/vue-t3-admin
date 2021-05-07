import * as type from '../mutation-types';
import { ActionContext } from 'vuex';
import { IAppState } from '@/typings';
import router from '@/router';

const menuData: any[] = [];
const filterMenuList = (route: any[]) => {
  route.forEach((item: any) => {
    const newItems: any = item;
    if (item.children && item.children.length > 0) {
      filterMenuList(item.children);
      if (item.meta && item.meta.hasChildrenInMenu) {
        newItems.children = { ...item.children };
      }
    }
    if (item.meta && item.meta.inMenu) {
      menuData.push(newItems);
    }
  });
  return menuData;
};

const app = {
  state: {
    sidebar: {
      collapsed: Boolean(Number(sessionStorage.getItem('sidebarStatus'))),
    },
    menuList: [],
  },
  mutations: {
    [type.TOGGLR_SIDEBAR]: (state: IAppState) => {
      state.sidebar.collapsed = !state.sidebar.collapsed;
      if (state.sidebar.collapsed) {
        sessionStorage.setItem('sidebarStatus', '1');
      } else {
        sessionStorage.setItem('sidebarStatus', '0');
      }
    },
    [type.GET_MENU_LIST]: (state: IAppState, menuData: any[]) => {
      state.menuList = menuData;
    },
  },
  actions: {
    toggleSidebar({ commit }: ActionContext<IAppState, any>) {
      commit(`${type.TOGGLR_SIDEBAR}`);
    },
    getMenuList({ commit }: ActionContext<IAppState, any>) {
      const menuData = filterMenuList(router.options.routes);
      commit(`${type.GET_MENU_LIST}`, menuData);
    },
  },
};

export default app;
