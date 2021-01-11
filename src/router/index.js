import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue'),
    props: (route) => ({ type: route.query.type })
  },
  {
    path: '/brands',
    name: 'Brands',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/brands/Index.vue'),
    props: (route) => ({ type: route.query.type })
  },
  {
    path: '/influencers',
    name: 'Influencers',
    component: () => import(/* webpackChunkName: "about" */ '../views/influencers/Index.vue'),
    props: (route) => ({ type: route.query.type })
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import(/* webpackChunkName: "about" */ '../views/Account.vue'),
    props: (route) => ({ type: route.query.type })
  },
  {
    path: '/user/:identifier/offers',
    name: 'Offer',
    component: () => import(/* webpackChunkName: "about" */ '../views/Offers.vue'),
    props: (route) => ({ type: route.query.type })
  },
  {
    path: '/valid',
    name:'Valid',
    component: () => import(/* webpackChunkName: "about" */ '../views/Valid.vue'),
    props: (route) => ({ type: route.query.type })
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "about" */ '../views/404.vue'),
    props: (route) => ({ type: route.query.type })
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
