'use strict';

import { Context, Next } from 'koa';

const xss = require('xss');
const mongoose =  require('mongoose');
const User = mongoose.model('User');
const uuid = require('uuid');
import UserHelper from '../dbhelper/userHelper';
import { RESPONSE_TAG } from '../constant';

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
  const filters = Object.keys(query);

  if (filters.length === 0) {
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
    // 检索用户

  }

  return next;
};

/**
 * 更新用户信息操作
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
// exports.update = async (ctx, next) => {
//   var body = ctx.request.body
//   var user = ctx.session.user
//   var fields = 'avatar,gender,age,nickname,breed'.split(',')

//   fields.forEach(function(field) {
//     if (body[field]) {
//       user[field] = xss(body[field].trim())
//     }
//   })

//   user = await user.save()

//   ctx.body = {
//     success: true,
//     data: {
//       nickname: user.nickname,
//       accessToken: user.accessToken,
//       avatar: user.avatar,
//       age: user.age,
//       breed: user.breed,
//       gender: user.gender,
//       _id: user._id
//     }
//   }
// }



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
