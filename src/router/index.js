import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login.vue';
import SignUp from '../components/SignUp.vue';
import Dashboard from '../components/Dashboard.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: SignUp,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
  ],
});

export default router;
