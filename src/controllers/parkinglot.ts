'use strict';

import { Context, Next } from 'koa';
import * as xss from 'xss';
import * as mongoose from 'mongoose';
const Parkinglot = mongoose.model('ParkingLot');
// const uuid = require('uuid');
import ParkinglotHelper from '../dbhelper/parkinglotHelper';
import { RESPONSE_TAG } from '../constant';
import { handleErr } from '../utils/errorHeper';

/**
 * 注册新停车场
 * @param {Function} next          [description]
 * @yield {[type]}   [description]
 */
export const signup = async (ctx: Context, next: Next) => {
  const name = xss(ctx.request.body.name.trim());
  const id = xss(ctx.request.body.id.trim());
  const phone = xss(ctx.request.body.phone.trim());
  const sex = xss(ctx.request.body.sex.trim());

  let parkinglot = await Parkinglot.findOne({
    id
  }).exec();
  console.log(parkinglot);

  if (!parkinglot) {
    // const accessToken = uuid.v4()

    parkinglot = new Parkinglot({
      name,
      id,
      phone,
      sex,
      // accessToken,
    });
    try {
      parkinglot = await parkinglot.save();
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
 * 获取停车场信息
 *
 */
export const getParkinglotInfo = async (ctx: Context, next: Next) => {
  const query = ctx.query;

  if (Object.keys(query).length === 0) {
    // 查询所有停车场信息
    const parkinglotInfo = await ParkinglotHelper.findAllParkinglots();
    if (typeof parkinglotInfo === 'string') {
      ctx.body = {
        code: 0,
        errMsg: RESPONSE_TAG.ERROR + parkinglotInfo,
      };
    } else {
      ctx.body = {
        code: 1,
        data: parkinglotInfo,
      };
    }
  } else {
    const parkinglotInfo = await ParkinglotHelper.searchParkinglots(query);
    if (typeof parkinglotInfo === 'string') {
      ctx.body = {
        code: 0,
        errMsg: RESPONSE_TAG.ERROR + parkinglotInfo,
      };
    } else {
      ctx.body = {
        code: 1,
        data: parkinglotInfo,
      };
    }
  }

  return next;
};

/**
 * 获取停车场信息
 *
 */
export const addParkinglot = async (ctx: Context, next: Next) => {
  // const query = ctx.query;
  console.log('addparkinglot', ctx.request.body);
  const res = ParkinglotHelper.addParkinglot(ctx.request.body);
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
 * 更新停车场信息操作
 */
export const updateParkinglot = async (ctx: Context, next: Next) => {
  try {
    const info: {[key: string]: string}[] = JSON.parse(ctx.request.body.info);
    info && info.forEach(async (record) => {
      const parkinglot = await Parkinglot.findOne({_id: record._id});
      Object.entries(record).forEach(field => {
        if (field[0] !== '_id') {
          parkinglot.set(field[0], field[1]);
        }
      });
      await parkinglot.save();
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