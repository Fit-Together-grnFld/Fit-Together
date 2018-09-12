import Vue from 'vue';
import Router from 'vue-router';
import LoginComponent from './views/login';
import homePage from './views/homePage';
import signUp from './views/signUp';
// create signup
// creat add event
// game page
// user page
// create game page
//
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'login',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginComponent,
    },
    {
      path: '/home',
      name: 'home',
      component: homePage,
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: signUp,
    },
  ],
});
