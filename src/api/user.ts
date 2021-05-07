/* 数据接口获取样例 */
import axios from '@/utils/request';
import { ILoginParams } from '@/typings';

// get
export const get = (params: any) => {
  return axios.get('/xxx', { params });
};

// post
export const post = (data: any) => {
  return axios.post('/xxx', data);
};

// 登录
export const login = (data: ILoginParams) => {
  return axios.post<any, any>('/login', data);
};

// 获取用户信息
export const getUserInfo = () => {
  return axios.get<any, any>('/userinfo');
};
