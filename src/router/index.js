import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login/index.vue';
import SignUp from '../views/SignUp/index.vue';
import Panel from '../views/Panel/index.vue';
import Replies from '../views/Replies/index.vue';


Vue.use(VueRouter);

const forUnAuthUsers = (to, from, next) => {
  if (!localStorage.getItem('token')) {
    next('/login');
  } else {
    next();
  }
};

const forAuthUsers = (to, from, next) => {
  if (localStorage.getItem('token')) {
    next('/panel');
  } else {
    next();
  }
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
    beforeEnter: forUnAuthUsers
  },
  {
    path: '/replies/:botId', 
    name: 'Replies', 
    component: Replies,
    beforeEnter: forUnAuthUsers
 }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
