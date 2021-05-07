import router from '@/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import store from '@/store';

const whiteList = ['/login']; // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start();
  const token = sessionStorage.getItem('token');
  if (token) {
    if (to.path === '/login') {
      next('/');
      NProgress.done();
    } else {
      if (store.getters.menuList.length === 0) {
        store.dispatch('getMenuList');
      }
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
