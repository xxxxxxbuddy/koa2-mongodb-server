'use strict'

const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

const db = 'mongodb://localhost/test';

/**
 * mongoose连接数据库
 * @type {[type]}
 */
mongoose.Promise = require('bluebird')
mongoose.connect(db)

/**
 * 获取数据库表对应的js对象所在的路径
 * @type {[type]}
 */
const models_path = path.join(__dirname, '/models')


/**
 * 已递归的形式，读取models文件夹下的js模型文件，并require
 * @param  {[type]} modelPath [description]
 * @return {[type]}           [description]
 */
var walk = function(modelPath) {
  fs
    .readdirSync(modelPath)
    .forEach(function(file) {
      var filePath = path.join(modelPath, '/' + file)
      var stat = fs.statSync(filePath)

      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(filePath)
        }
      }
      else if (stat.isDirectory()) {
        walk(filePath)
      }
    })
}
walk(models_path)

require('babel-register')
import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as session from 'koa-session';
import * as bodyParser from 'koa-bodyparser';
const app = new Koa()

app.keys = ['zhanglei']
app.use(logger())
app.use(session({
  maxAge: 3600000,  // session一小时过期
}, app))
app.use(bodyParser())
app.use(async (ctx, next)=> {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200; 
  } else {
    await next();
  }
});

/**
 * 使用路由转发请求
 * @type {[type]}
 */
const router = require('../config/router')()

app
  .use(router.routes())
  .use(router.allowedMethods());



app.listen(1234)
console.log('app started at port 1234...');