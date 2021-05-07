import * as type from '../mutation-types';
import { ActionContext } from 'vuex';
import { IAppState } from '@/typings';

const app = {
  state: {
    menu: {
      collapsed: Boolean(Number(sessionStorage.getItem('sidebarStatus'))),
    },
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
  },
  actions: {
    toggleSidebar({ commit }: ActionContext<IAppState, any>) {
      commit(`${type.TOGGLR_SIDEBAR}`);
    },
  },
};

export default app;
