'use strict';

import { Context, Next } from 'koa';
import * as xss from 'xss';
import * as mongoose from 'mongoose';
const Tenant = mongoose.model('Tenant');
// const uuid = require('uuid');
import TenantHelper from '../dbhelper/tenantHelper';
import { RESPONSE_TAG } from '../constant';
import { handleErr } from '../utils/errorHeper';

/**
 * 注册新租户
 * @param {Function} next          [description]
 * @yield {[type]}   [description]
 */
export const signup = async (ctx: Context, next: Next) => {
  const name = xss(ctx.request.body.name.trim());
  const id = xss(ctx.request.body.id.trim());
  const phone = xss(ctx.request.body.phone.trim());
  const sex = xss(ctx.request.body.sex.trim());

  let tenant = await Tenant.findOne({
    id
  }).exec();
  console.log(tenant);

  if (!tenant) {
    // const accessToken = uuid.v4()

    tenant = new Tenant({
      name,
      id,
      phone,
      sex,
      // accessToken,
    });
    try {
      tenant = await tenant.save();
      ctx.body = {
        code: 1,
      };
    } catch (e) {
      ctx.body = {
        code: 0,
        errMsg: `[Error] ${e.message}`,
      };
    }
  }
  else {
    ctx.body = {
      code: 0,
      errMsg: '[Error] This id had been registered.',
    };
    // console.log(ctx)
    // ctx.body.code = 0;
    // ctx.body.errMsg = '[Error] This id has been registerd.';
  }

  return next;
};

/**
 * 获取租户信息
 *
 */
export const getTenantInfo = async (ctx: Context, next: Next) => {
  const query = ctx.query;

  if (Object.keys(query).length === 0) {
    // 查询所有租户信息
    const tenantInfo = await TenantHelper.findAllTenants();
    if (typeof tenantInfo === 'string') {
      ctx.body = {
        code: 0,
        errMsg: RESPONSE_TAG.ERROR + tenantInfo,
      };
    } else {
      ctx.body = {
        code: 1,
        data: tenantInfo,
      };
    }
  } else {
    const tenantInfo = await TenantHelper.searchTenants(query);
    if (typeof tenantInfo === 'string') {
      ctx.body = {
        code: 0,
        errMsg: RESPONSE_TAG.ERROR + tenantInfo,
      };
    } else {
      ctx.body = {
        code: 1,
        data: tenantInfo,
      };
    }
  }

  return next;
};

/**
 * 获取租户信息
 *
 */
export const addTenant = async (ctx: Context, next: Next) => {
  // const query = ctx.query;
  console.log('addtenant', ctx.request.body);
  const res = TenantHelper.addTenant(ctx.request.body);
  // console.log(res);
  await res.then(res => {
    ctx.body = {
      code: 0,
      data: res,
    };
  },
    err => {
      ctx.body = {
        code: 1,
        errMsg: handleErr(err),
      };
    });

  return next;
};

/**
 * 更新租户信息操作
 */
export const updateTenant = async (ctx: Context, next: Next) => {
  try {
    const info: {[key: string]: string}[] = ctx.request.body.info;
    info && info.forEach(async (record) => {
      const tenant = await Tenant.findOne({_id: record._id});
      Object.entries(record).forEach(field => {
        if (field[0] !== '_id') {
          tenant.set(field[0], field[1]);
        }
      });
      await tenant.save();
    });

    ctx.body = {
      code: 1,
    };
  } catch (e) {
    ctx.body = {
      code: 0,
      errMsg: RESPONSE_TAG.ERROR + e.message,
    };
  }

 return next;
};