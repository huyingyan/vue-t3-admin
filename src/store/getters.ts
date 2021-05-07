import { IUserState, IAppState } from '@/typings';

const getters = {
  token: (state: any) => (state.user as IUserState).token,
  name: (state: any) => (state.user as IUserState).name,
  avatar: (state: any) => (state.user as IUserState).avatar,
  sidebar: (state: any) => (state.app as IAppState).sidebar,
  menuList: (state: any) => (state.app as IAppState).menuList,
};

export default getters;
