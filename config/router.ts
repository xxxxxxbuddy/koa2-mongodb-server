// @ts-nocheck

import * as Router from 'koa-router';
import * as User from '../src/controllers/user';
import * as Carport from '../src/controllers/carport';
import * as Car from '../src/controllers/car';
import * as Parkinglot from '../src/controllers/parkinglot';
import * as Tenant from '../src/controllers/tenant';
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
  router.del('/user/delete', App.hasBody, App.hasToken, User.deleteUser);

  // carport
  router.get('/carport/get', App.hasBody, App.hasToken, Carport.getCarportInfo);
  router.put('/carport/add', App.hasBody, App.hasToken, Carport.addCarport);
  router.post('/carport/update', App.hasBody, App.hasToken, Carport.updateCarport);
  router.get('/carport/parkinglot_state', App.hasBody, App.hasToken, Carport.getParkinglotState);

  // car
  router.get('/car/get', App.hasBody, App.hasToken, Car.getCarInfo);
  router.put('/car/add', App.hasBody, App.hasToken, Car.addCar);
  router.post('/car/update', App.hasBody, App.hasToken, Car.updateCar);

  // parkinglot
  router.get('/parkinglot/get', App.hasBody, App.hasToken, Parkinglot.getParkinglotInfo);
  router.put('/parkinglot/add', App.hasBody, App.hasToken, Parkinglot.addParkinglot);
  router.post('/parkinglot/update', App.hasBody, App.hasToken, Parkinglot.updateParkinglot);

  // tenant
  router.get('/tenant/get', App.hasBody, App.hasToken, Tenant.getTenantInfo);
  router.put('/tenant/add', App.hasBody, App.hasToken, Tenant.addTenant);
  router.post('/tenant/update', App.hasBody, App.hasToken, Tenant.updateTenant);

  // admin
  router.post('/login', App.hasBody, App.login);
  router.put('/admin/add', App.hasBody, App.add);


  // // DB Interface test
  // router.get('/test/user/users',User.users)
  // router.post('/test/user/add',User.addUser)
  // router.post('/test/user/delete',User.deleteUser)

  return router;
};