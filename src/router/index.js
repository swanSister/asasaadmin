import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/main'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    }
  ]
})
