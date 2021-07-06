import Vue from 'vue'
import Router from 'vue-router'
import SearchHotelPage from "./pages/SearchHotelPage.vue";
import { routers } from './presentation/navigation/router'
import { hotelsArea } from './utils/routes';

Vue.use(Router)
export async function createRouter() {
  const routes = async () => {
    const baseRoute = routers();

    hotelsArea.map(area => {
      baseRoute.push({
        path: `/hotels-${area}`,
        component: SearchHotelPage
      })
    })

    return baseRoute;
  }

  return new Router({
    mode: 'history',
    routes: await routes(),
    scrollBehavior(to, _from, savedPosition) {
      if (to.matched.some(m => m.meta.disableScroll)) { return }

      const position = {
        x: 0,
        y: 0
      }

      if (savedPosition) {
        position.x = savedPosition.x
        position.y = savedPosition.y
      }

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(position)
        }, 150)
      })
    }
  })
}
