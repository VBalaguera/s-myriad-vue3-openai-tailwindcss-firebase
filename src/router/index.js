// vue-router

import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

import { getUserState } from '../firebase/index'

import Home from '../views/Home'
import Notes from '../views/Notes'
import About from '../views/About'
import Login from '../views/Login'
import AIPage from '../views/AIPage.vue'
import AIResults from '@/views/AIResults'
import Profile from '@/views/Profile.vue'
import Signup from '../views/Signup'
import ForgotPassword from '../views/ForgotPassword'

import NotFound from '@/views/NotFound'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
    },
  },
  {
    path: '/notes',
    name: 'Notes',
    component: Notes,
    meta: {
      title: 'Notes',
      requiresAuth: true,
    },
  },
  {
    path: '/ai',
    name: 'AIPage',
    component: AIPage,
    meta: {
      title: 'AI',
      requiresAuth: true,
    },
  },
  {
    path: '/ai-results',
    name: 'AIResults',
    component: AIResults,
    meta: {
      title: 'AI results',
      requiresAuth: true,
    },
  },
  // {
  //   path: '/profile',
  //   name: 'Profile',
  //   component: Profile,
  //   meta: {
  //     title: 'Profile',
  //     requiresAuth: true,
  //   },
  // },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: { title: 'Sign up', requiresUnauth: true },
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: { title: 'Forgot password', requiresUnAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: 'Login', requiresUnauth: true },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: 'About' },
  },
  {
    path: '/:catchAll(.*)',
    name: NotFound,
    component: NotFound,
    meta: { title: 'NotFound' },
  },
]

const router = createRouter({
  // history: createWebHashHistory(process.env.BASE_URL),
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

router.beforeEach(async (to, from, next) => {
  // meta
  document.title = `${process.env.VUE_APP_TITLE} - ${to.meta?.title}`

  // protected routes
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const requiresUnauth = to.matched.some((record) => record.meta.requiresUnauth)

  const isAuth = await getUserState()
  if (requiresAuth && !isAuth) next('/login')
  else if (requiresUnauth && isAuth) next('/')
  else next()
})

export default router
