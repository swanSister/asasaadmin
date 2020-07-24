import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/main'
import Auth from '@/pages/auth'
import Notice from '@/pages/notice'
import NoticeWriting from '@/pages/noticeWriting'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/notice',
      name: 'notice',
      component: Notice
    },
    {
      path: '/noticeWriting',
      name: 'noticeWriting',
      component: NoticeWriting
    }
  ]
})
