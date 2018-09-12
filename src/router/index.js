import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import PostsManager from '@/components/PostsManager';
import Auth from '@okta/okta-vue';
import store from '../store'

Vue.use(Auth, {
  issuer: 'https://dev-127433.oktapreview.com/oauth2/default',
  client_id: '0oag88bjqrTLOXCKg0h7',
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile email',
});

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback(),
    },
    {
      path: '/posts-manager',
      name: 'PostsManager',
      component: PostsManager,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});
router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router;
