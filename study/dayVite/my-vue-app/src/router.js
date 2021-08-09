import { h } from 'vue'

import Home from './views/home.vue'
import Shop from './views/shop.vue'
import NotFound from './views/404.vue'

const routes = {
  '/': Home,
  '/shop': Shop
}

const SimpleRouter = {
  data: () => ({
    currentRoute: window.location.pathname
  }),

  computed: {
    CurrentComponent() {
      return routes[this.currentRoute] || NotFound
    }
  },

  render() {
    return h(this.CurrentComponent)
  }
}

export default SimpleRouter

