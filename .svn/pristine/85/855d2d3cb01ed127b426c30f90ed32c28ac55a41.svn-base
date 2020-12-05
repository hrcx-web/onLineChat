import { constantRoutes, memberRoutes, adminRoutes, channelRoutes } from '@/router'
import router from '@/router'

export default function routeControl() {
  let routes = []
  const loginType = localStorage.getItem('loginType')
  if (loginType === 'union') {
    routes = memberRoutes
  } else if (loginType === 'distributor') {
    routes = channelRoutes
  } else {
    routes = adminRoutes
  }
  router.options.routes = constantRoutes.concat(routes)

  router.addRoutes(routes)
}
