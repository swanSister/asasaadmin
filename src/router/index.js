import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/main'
import Login from '@/pages/login'
import Auth from '@/pages/auth'
import Notice from '@/pages/notice'
import NoticeWriting from '@/pages/noticeWriting'
import NoticeDetail from '@/pages/noticeDetail'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/main',
      name: 'main',
      component: Main
    },
    {
      path: '/login',
      name: 'login',
      component: Login
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
    },
    {
      path: '/noticeDetail',
      name: 'noticeDetail',
      component: NoticeDetail
    }
  ]
})
