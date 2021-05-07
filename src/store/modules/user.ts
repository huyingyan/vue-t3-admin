import * as type from '../mutation-types';
import { ActionContext } from 'vuex';
import { login, getUserInfo } from '@/api/user';
import { IUserState, ILoginParams } from '@/typings';

const user = {
  state: {
    token: sessionStorage.getItem('token') || '',
    name: '',
    avatar: '',
  },
  mutations: {
    [type.SET_TOKEN]: (state: IUserState, token: string) => {
      state.token = token;
    },
    [type.GET_USERINFO]: (state: IUserState, data: any) => {
      state.name = data.name;
      state.avatar = data.avatar;
    },
  },
  actions: {
    login(
      { commit }: ActionContext<IUserState, any>,
      loginParams: ILoginParams,
    ) {
      return new Promise((resolve) => {
        login(loginParams).then((res) => {
          sessionStorage.setItem('token', res.token);
          commit(`${type.SET_TOKEN}`, res.token);
          resolve(res);
        });
      });
    },
    getUserInfo({ commit }: ActionContext<IUserState, any>) {
      return new Promise((resolve) => {
        getUserInfo().then((res) => {
          commit(`${type.GET_USERINFO}`, res);
          resolve(res);
        });
      });
    },
  },
};

export default user;
