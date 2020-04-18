// @ts-nocheck

import * as Router from 'koa-router';
import * as User from '../src/controllers/user';
import * as App from '../src/controllers/app';

module.exports = function() {
  const router = new Router({
    prefix: '/api',
    methods: ['get', 'post', 'put', 'delete'],
  });

  // user
  router.post('/user/signup', App.hasBody, User.signup);
  router.get('/user/getinfo', App.hasBody, App.hasToken, User.getUserInfo);
  router.put('/user/add', App.hasBody, App.hasToken, User.addUser);
  router.post('/user/update', App.hasBody, App.hasToken, User.updateUser);

  // // DB Interface test
  // router.get('/test/user/users',User.users)
  // router.post('/test/user/add',User.addUser)
  // router.post('/test/user/delete',User.deleteUser)

  return router;
};