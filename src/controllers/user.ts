'use strict';

import { Context, Next } from 'koa';
import * as xss from 'xss';
import * as mongoose from 'mongoose';
const User = mongoose.model('User');
// const uuid = require('uuid');
import UserHelper from '../dbhelper/userHelper';
import { RESPONSE_TAG } from '../constant';
import { handleErr } from '../utils/errorHeper';

// var userHelper = require('../dbhelper/userHelper')

/**
 * 注册新用户
 * @param {Function} next          [description]
 * @yield {[type]}   [description]
 */
export const signup = async (ctx: Context, next: Next) => {
  const name = xss(ctx.request.body.name.trim());
  const id = xss(ctx.request.body.id.trim());
  const phone = xss(ctx.request.body.phone.trim());
  const sex = xss(ctx.request.body.sex.trim());

  let user = await User.findOne({
    id
  }).exec();
  console.log(user);

  if (!user) {
    // const accessToken = uuid.v4()

    user = new User({
      name,
      id,
      phone,
      sex,
      // accessToken,
    });
    try {
      user = await user.save();
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
 * 获取用户信息
 *
 */
export const getUserInfo = async (ctx: Context, next: Next) => {
  const query = ctx.query;

  if (Object.keys(query).length === 0) {
    // 查询所有用户信息
    const userInfo = await UserHelper.findAllUsers();
    if (typeof userInfo === 'string') {
      ctx.body = {
        code: 0,
        errMsg: RESPONSE_TAG.ERROR + userInfo,
      };
    } else {
      ctx.body = {
        code: 1,
        data: userInfo,
      };
    }
  } else {
    const userInfo = await UserHelper.searchUsers(query);
    if (typeof userInfo === 'string') {
      ctx.body = {
        code: 0,
        errMsg: RESPONSE_TAG.ERROR + userInfo,
      };
    } else {
      ctx.body = {
        code: 1,
        data: userInfo,
      };
    }
  }

  return next;
};

/**
 * 获取用户信息
 *
 */
export const addUser = async (ctx: Context, next: Next) => {
  // const query = ctx.query;
  console.log('adduser', ctx.request.body);
  const res = UserHelper.addUser(ctx.request.body);
  // console.log(res);
  await res.then(res => {
    ctx.body = {
      code: 1,
      data: res,
    };
  },
    err => {
      ctx.body = {
        code: 0,
        errMsg: handleErr(err),
      };
    });

  return next;
};

/**
 * 更新用户信息操作
 */
export const updateUser = async (ctx: Context, next: Next) => {
  const info: {[key: string]: string}[] = ctx.request.body.info;
  if (info) {
    const res = UserHelper.updateUser(info);
    await res.then(res => {
      ctx.body = {
        code: 1,
        data: res,
      };
    },
    err => {
      ctx.body = {
        code: 0,
        errMsg: handleErr(err),
      };
    });
  }
  if (!ctx.body.code || ctx.body.code === 1) {
    ctx.body = {
      code: 0,
    };
  }

 return next;
};

/**
 * 删除用户
 */
export const deleteUser = async (ctx: Context, next: Next) => {
  const data: {[key: string]: string}[] = ctx.request.body;
  const res = UserHelper.deleteUser(data);
  await res.then(res => {
    ctx.body = {
      code: 1,
      data: res,
    };
  },
  err => {
    ctx.body = {
      code: 0,
      errMsg: handleErr(err),
    };
  });

 return next;
};