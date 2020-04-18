'use strict';

import { Context, Next } from 'koa';
import * as xss from 'xss';
import * as mongoose from 'mongoose';
const User = mongoose.model('User');
// const uuid = require('uuid');
import UserHelper from '../dbhelper/userHelper';
import { RESPONSE_TAG } from '../constant';
import { handleErr } from '../utils/errorHeper';
import { UserSchema } from '../models/user';

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
 * 更新用户信息操作
 */
export const updateUser = async (ctx: Context, next: Next) => {
  try {
    const info: {[key: string]: string}[] = JSON.parse(ctx.request.body.info);
    info && info.forEach(async (record) => {
      const user = await User.findOne({id: record.id});
      Object.entries(record).forEach(field => {
        if (field[0] !== 'id') {
          user.set(field[0], field[1]);
        }
      });
      await user.save();
    });

    ctx.body = {
      code: 0,
    };
  } catch (e) {
    ctx.body = {
      code: 1,
      errMsg: RESPONSE_TAG.ERROR + e.message,
    };
  }

 return next;
};

// /**
//  * 数据库接口测试
//  * @param  {[type]}   ctx  [description]
//  * @param  {Function} next [description]
//  * @return {[type]}        [description]
//  */
// exports.users = async (ctx, next) => {
//   var data = await userHelper.findAllUsers()
//   // var obj = await userHelper.findByPhoneNumber({phoneNumber : '13525584568'})
//   // console.log('obj=====================================>'+obj)

//   ctx.body = {
//     success: true,
//     data
//   }
// }
// exports.addUser = async (ctx, next) => {
//   var user = new User({
//       nickname: '测试用户',
//       avatar: 'http://ip.example.com/u/xxx.png',
//       phoneNumber: xss('13800138000'),
//       verifyCode: '5896',
//       accessToken: uuid.v4()
//     })
//   var user2 =  await userHelper.addUser(user)
//   if(user2){
//     ctx.body = {
//       success: true,
//       data : user2
//     }
//   }
// }
// exports.deleteUser = async (ctx, next) => {
//   const phoneNumber = xss(ctx.request.body.phoneNumber.trim())
//   console.log(phoneNumber)
//   var data  = await userHelper.deleteUser({phoneNumber})
//   ctx.body = {
//     success: true,
//     data
//   }
// }
