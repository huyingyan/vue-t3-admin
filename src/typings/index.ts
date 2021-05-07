/** 全局stroe */
export interface IGlobalState {}

// userstate
export interface IUserState {
  token: string;
  name: string;
  avatar: string;
}

export interface IAppStateSidebar {
  collapsed: boolean;
}
// appstate
export interface IAppState {
  sidebar: IAppStateSidebar;
  menuList: any[];
}

// 登录接口参数
export interface ILoginParams {
  username: string;
  password: string;
}

// 文章列表接口参数
export interface IArticleParams {
  page: number;
  pageSize?: number;
  title?: string;
  type?: number;
  createTime?: Date;
  status?: number;
}

// 文章数据
export interface IArticle{
  id: number;
  title: string;
  anthor: string;
  type: number;
  createTime: Date;
  status: number;
}