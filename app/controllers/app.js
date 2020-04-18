'use strict'

// 用于封装controllers的公共方法

import * as mongoose from 'mongoose';
import * as uuid from 'uuid';
import { RESPONSE_TAG } from '../../src/constant';

const User = mongoose.model('User')
exports.hasBody = async (ctx, next) => {
  var body = ctx.request.body || {}
  // console.log(this.query.phonenumber)
  // console.log(body)

  // if (Object.keys(body).length === 0) {
  //   ctx.body = {
  //     success: false,
  //     err: '某参数缺失'
  //   }

  //   return next
  // }

  await next();
}

// 检验token
exports.hasToken = async (ctx, next) => {
  var accessToken = ctx.session;

  if (accessToken.isNew) {
    ctx.body = {
      code: 405,
      err: RESPONSE_TAG.ERROR + 'Unauthorized.',
    }

    return next;
  }

  await next();
};