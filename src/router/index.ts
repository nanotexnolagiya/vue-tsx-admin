import Router from 'vue-router'
import Vue from 'vue'
import store from '../store'
import front from './front'
import dashboard from './dashboard'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [...front, ...dashboard]
});

router.beforeEach((to, _, next) => {
  if (to.matched.some((record) => record.meta.private)) {
    if (!store.state.auth.accessToken) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
      next()
    } else {
      next()
    }
  } else {
    next()
  }
  next()
});

export default router;
