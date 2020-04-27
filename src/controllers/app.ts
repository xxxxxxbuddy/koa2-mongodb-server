'use strict';

// 用于封装controllers的公共方法

import * as mongoose from 'mongoose';
import { Context, Next } from 'koa';
import { RESPONSE_TAG } from '../constant';
import AdminHelper from '../dbhelper/adminHelper';
import TenantHelper from '../dbhelper/tenantHelper';

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

export const login = async (ctx: Context, next: Next) => {
  const body = ctx.request.body;
  const data = await AdminHelper.Login({admin_account: body.account, admin_password: body.password});
  if (data.length > 0) {
    ctx.body = {
      code: 1,
      data: 0,
    };
  } else {
    const tenant = await TenantHelper.Login({tenant_account: body.account, tenant_password: body.password});
    if (tenant.length > 0) {
      ctx.body = {
        code: 1,
        data: 1,
      };
    } else {
      ctx.body = {
        code: 0,
      };
    }
  }

  await next();
};

export const add = async (ctx: Context, next: Next) => {
  await AdminHelper.addAdmin(ctx.request.body).then(res => {
    ctx.body = {
      code: 1,
    };
  }, e => {
    ctx.body = {
      code: 0,
      errMsg: RESPONSE_TAG + e.message,
    };
  });


  await next();
};