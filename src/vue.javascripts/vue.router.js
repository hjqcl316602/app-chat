
import Router from 'vue-router'
import Routes from './vue.router.routes'

const router = new Router({

  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  },
  routes: Routes
})

router.beforeEach( ( to, from, next ) => {
  document.title = to.meta.title ;
  let isLogin = to.meta.isLogin ;
  let isLogined = sessionStorage.getItem('login-info');

  // 记录访问过的页面
  let historyRouter = sessionStorage.getItem('router-history')? JSON.parse(sessionStorage.getItem('router-history')) : [];
  historyRouter.push(to.name)
  sessionStorage.setItem('router-history',JSON.stringify(historyRouter));

  if( isLogin && !isLogined){
    sessionStorage.setItem('redirect',to.fullPath);
    next({ path : '/Login'})
  }else{
    next()
  }




});

export default router
