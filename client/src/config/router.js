import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from './../spa/Login/Login';
import JoinPage from './../spa/Join/Join';
import MainPage from './../spa/Main/Main';
import Contents from '../spa/Main/components/Contents';
import Profile from '../spa/Main/components/Profile';
import NotFound from '../spa/NotFound';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: LoginPage,
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
    },
    {
      path: '/join',
      name: 'JoinPage',
      component: JoinPage,
    },
    {
      path: '/main',
      component: MainPage,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          name: 'MainPage',
          path: 'contents',
          component: Contents,
        },
        {
          name: 'ProfilePage',
          path: 'profile/:id',
          component: Profile,
        },
      ],
    },
    /* redirect */
    {
      path: '/main',
      redirect: {
        name: 'LoginPage'
      },
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/main/contents',
      redirect: {
        name: 'LoginPage'
      },
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/main/profile',
      redirect: {
        name: 'LoginPage'
      },
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/main/profile/:id',
      redirect: {
        name: 'LoginPage'
      },
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
});
