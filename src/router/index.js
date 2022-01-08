import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login/index.vue';
import SignUp from '../views/SignUp/index.vue';
import Panel from '../views/Panel/index.vue';
import Replies from '../views/Replies/index.vue';
import Confirm from '../views/Confirm.vue'
import error404 from '../views/error404.vue'

Vue.use(VueRouter);

const forUnAuthUsers = (to, from, next) => {
  if (localStorage.getItem('token')) {
    next();
  } else {
    next('/login');
  }
};

const forAuthUsers = (to, from, next) => {
  if (localStorage.getItem('token')) {
    next('/panel');
  } else {
    next();
  }
};

const fullRedirect = (to, from, next) => {
  if (localStorage.getItem('token')) {
    next('/login');
  } else {
    next('/panel');
  }
};

const routes = [
  {
    path: '/',
    name: 'Home',
    beforeEnter: fullRedirect,
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
  {
    path: '/account/confirm/:resetToken',
    name: 'Confirm',
    component: Confirm,
    beforeEnter: forAuthUsers,
  },
  { path: '/*', component: error404, beforeEnter: fullRedirect },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
