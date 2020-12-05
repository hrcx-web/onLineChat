import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import routeControl from '@/utils/router-control'
import { unique } from '@/utils/index'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // history tab
  let history = store.state.user.history || []
  const { meta = {}} = to
  if (meta.title) history.push({ title: meta.title, path: to.path })
  history = unique(history)
  sessionStorage.setItem('history', JSON.stringify(history))
  store.commit('user/SET_HISTORY', history)

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
    } else {
      const hasGetRoutes = store.state.user.hasGetRoutes
      if (hasGetRoutes) {
        next()
      } else {
        try {
          // get user info
          store.commit('user/SET_ROUTES_STATE', true)
          await routeControl()

          if (to.path === '/404') {
            next({ path: to.redirectedFrom })
          } else {
            next({ ...to, replace: true })
          }
          // next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
    NProgress.done()
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
