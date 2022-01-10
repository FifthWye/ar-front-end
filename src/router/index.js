import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login/index.vue';
import SignUp from '../views/SignUp/index.vue';
import Panel from '../views/Panel/index.vue';
import Replies from '../views/Replies/index.vue';
import Confirm from '../views/Confirm.vue';
import error404 from '../views/error404.vue';
import { parseJwt } from '../utils/parseJwt'
import Recover from '../views/Recover/index.vue';
import PasswordReset from '../views/Recover/PasswordReset.vue';
import Account from '../views/Account/index.vue';
import Moderators from '../views/Moderators/index.vue';

Vue.use(VueRouter);

const forUnAuthUsers = (to, from, next) => {
  const { isVerified } = parseJwt(localStorage.getItem('token'));
  if (localStorage.getItem('token') && isVerified) {
    next();
  } else {
    next('/login');
  }
};

const forAuthUsers = (to, from, next) => {
  const { isVerified } = parseJwt(localStorage.getItem('token'));
  if (localStorage.getItem('token') && isVerified) {
    next('/panel');
  } else {
    next();
  }
};

const fullRedirect = (to, from, next) => {
  const { isVerified } = parseJwt(localStorage.getItem('token'));
  if (localStorage.getItem('token') && isVerified) {
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
    path: '/accounts/recover/',
    name: 'Recover',
    component: Recover,
    beforeEnter: forAuthUsers,
  },
  {
    path: '/accounts/password/reset/:token',
    name: 'PasswordReset',
    component: PasswordReset,
    beforeEnter: forAuthUsers,
  },
  {
    path: '/panel',
    name: 'Panel',
    component: Panel,
    beforeEnter: forUnAuthUsers,
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    beforeEnter: forUnAuthUsers,
  },
  {
    path: '/moderators/:botId',
    name: 'Moderators',
    component: Moderators,
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
  },
  { path: '/*', component: error404, beforeEnter: fullRedirect },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
