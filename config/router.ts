'use strict';

const Router = require('koa-router');
const User = require('../src/controllers/user');
const App = require('../src/controllers/app');

module.exports = function() {
  const router = new Router({
    prefix: '/api',
  });

  // user
  router.post('/user/signup', App.hasBody, User.signup);
  router.post('/user/getinfo', App.hasBody, User.getUserInfo);
  // router.post('/u/update', App.hasBody, App.hasToken, User.update)

  // // DB Interface test
  // router.get('/test/user/users',User.users)
  // router.post('/test/user/add',User.addUser)
  // router.post('/test/user/delete',User.deleteUser)

  return router;
};