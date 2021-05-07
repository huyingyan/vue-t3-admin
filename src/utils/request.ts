// import { IResponse } from '@/typings';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import config from './config';
import { message } from 'ant-design-vue';

const baseURL = config.apiHost;

const option: AxiosRequestConfig = {
  baseURL,
};

// 创建 axios 实例
const service = axios.create(option);

// http request 拦截器
service.interceptors.request.use(
  (config) => {
    const token = sessionStorage.token;
    if (token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = token;
    }
    return config;
  },
  (err) => Promise.reject(err),
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    // 判断处理结果是文件类型时，不对结果集处理，直接返回
    if (res instanceof Blob) {
      return response;
    }
    // 这里需要根据不同的项目后端接口封装情况做适当调整
    if (res.isError) {
      return Promise.reject(new Error((res && res.error) || '未知异常！'));
    } else if (res.code != 200) {
      message.error((res && res.message) || '未知异常！');
      return Promise.reject(new Error((res && res.message) || '未知异常！'));
    } else {
      return res.data;
    }
  },
  (error: AxiosError) => {
    if (axios.isCancel(error)) {
      console.log('Request canceled');
      return null;
    }
    return Promise.reject(error);
  },
);

export default service;
