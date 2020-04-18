'use strict';

// 用于封装controllers的公共方法

import * as mongoose from 'mongoose';
import { Context, Next } from 'koa';
import { RESPONSE_TAG } from '../constant';
const User = mongoose.model('User');

export const hasBody = async (ctx: Context, next: Next) => {
  const body = ctx.request.body || {};
  // console.log(this.query.phonenumber)
  console.log(body);

  // if (Object.keys(body).length === 0) {
  //   ctx.body = {
  //     success: false,
  //     err: '某参数缺失'
  //   }

  //   return next
  // }

  await next();
};

// 检验token
export const hasToken = async (ctx: Context, next: Next) => {
  const accessToken = ctx.session;

  if (!accessToken) {
    ctx.body = {
      code: 405,
      err: RESPONSE_TAG.ERROR + 'Unauthroized.',
    };
    return next;
  }

  await next();
};