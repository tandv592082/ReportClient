import NProgress from 'nprogress'; // progress bar
import getPageTitle from '@/utils/get-page-title';
import { getUserLocal } from '@/utils/user';
import router from './router';
import store from './store';
import 'nprogress/nprogress.css'; // progress bar style

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/login']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();
  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  const userId = getUserLocal();

  if (userId) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' });
      NProgress.done();
    } else {
      const hasGetUserInfo = store.getters['user/role'];
      if (hasGetUserInfo) {
        if (to.meta.role) {
          if (hasGetUserInfo === to.meta.role) {
            next();
          } else {
            next('/');
          }
        } else {
          next();
        }
      } else {
        try {
          // get user info
          await store.dispatch('user/getUserInfo', userId);
          const role = store.getters['user/role'];
          if (to.meta.role) {
            if (role === to.meta.role) {
              next();
            } else {
              next('/');
            }
          } else {
            next();
          }
        } catch (error) {
          // remove token and go to login page to re-login
          store.commit('user/setUser', null);
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token */

    // eslint-disable-next-line no-lonely-if
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
