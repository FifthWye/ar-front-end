import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login/index.vue';
import SignUp from '../views/SignUp/index.vue';
import Panel from '../views/Panel/index.vue';
import Replies from '../views/Replies/index.vue';

Vue.use(VueRouter);

const forUnAuthUsers = (to, from, next) => {
  if (localStorage.getItem('token')) {
    next();
  } else {
    window.location = `/login`;
  }
};

const forAuthUsers = (to, from, next) => {
  if (localStorage.getItem('token')) {
    window.location = `/panel`;
  } else {
    next();
  }
};

// eslint-disable-next-line no-unused-vars
const fullRedirect = (to, from, next) => {
  if (localStorage.getItem('token')) {
    window.location = `/login`;
  } else {
    window.location = `/panel`;
  }
};

const routes = [
  {
    path: '/',
    name: 'Home',
    beforeEnter: fullRedirect,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: forAuthUsers,
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
    beforeEnter: forAuthUsers,
  },
  {
    path: '/panel',
    name: 'Panel',
    component: Panel,
    beforeEnter: forUnAuthUsers,
  },

  {
    path: '/replies/:botId',
    name: 'Replies',
    component: Replies,
    beforeEnter: forUnAuthUsers,
  },
  { path: '*', component: fullRedirect },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
