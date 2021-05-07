/* 数据接口获取样例 */
import axios from '@/utils/request';
import { IArticleParams } from '@/typings';

// 文章列表
export const getList = (data: IArticleParams) => {
  return axios.post<any, any>('/article/list', data);
};
