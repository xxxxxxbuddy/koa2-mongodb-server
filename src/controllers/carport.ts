'use strict';

import { Context, Next } from 'koa';
import * as xss from 'xss';
import * as mongoose from 'mongoose';
const Carport = mongoose.model('Carport');
const Parkinglot = mongoose.model('ParkingLot');
// const uuid = require('uuid');
import CarportHelper from '../dbhelper/carportHelper';
import { RESPONSE_TAG } from '../constant';
import { handleErr } from '../utils/errorHeper';

/**
 * 注册新车位
 * @param {Function} next          [description]
 * @yield {[type]}   [description]
 */
export const signup = async (ctx: Context, next: Next) => {
  const name = xss(ctx.request.body.name.trim());
  const id = xss(ctx.request.body.id.trim());
  const phone = xss(ctx.request.body.phone.trim());
  const sex = xss(ctx.request.body.sex.trim());

  let carport = await Carport.findOne({
    id
  }).exec();
  console.log(carport);

  if (!carport) {
    // const accessToken = uuid.v4()

    carport = new Carport({
      name,
      id,
      phone,
      sex,
      // accessToken,
    });
    try {
      carport = await carport.save();
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
 * 获取车位信息
 *
 */
export const getCarportInfo = async (ctx: Context, next: Next) => {
  const query = ctx.query;

  if (Object.keys(query).length === 0) {
    // 查询所有车位信息
    const carportInfo = await CarportHelper.findAllCarports();
    if (typeof carportInfo === 'string') {
      ctx.body = {
        code: 0,
        errMsg: RESPONSE_TAG.ERROR + carportInfo,
      };
    } else {
      ctx.body = {
        code: 1,
        data: carportInfo,
      };
    }
  } else {
    const carportInfo = await CarportHelper.searchCarports(query);
    if (typeof carportInfo === 'string') {
      ctx.body = {
        code: 0,
        errMsg: RESPONSE_TAG.ERROR + carportInfo,
      };
    } else {
      ctx.body = {
        code: 1,
        data: carportInfo,
      };
    }
  }

  return next;
};

/**
 * 获取车位信息
 *
 */
export const addCarport = async (ctx: Context, next: Next) => {
  // const query = ctx.query;
  console.log('addcarport', ctx.request.body);
  const res = CarportHelper.addCarport(ctx.request.body);
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
 * 更新车位信息操作
 */
export const updateCarport = async (ctx: Context, next: Next) => {
  try {
    const info: {[key: string]: string}[] = ctx.request.body.info;
    info && info.forEach(async (record) => {
      const carport = await Carport.findOne({_id: record._id});
      Object.entries(record).forEach(field => {
        if (field[0] !== '_id') {
          carport.set(field[0], field[1]);
        }
      });
      await carport.save();
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

/**
 * 查询停车场内车位状态
 */
export const getParkinglotState = async (ctx: Context, next: Next) => {
  const res = CarportHelper.getParkinglotState();
  await res.then(r => {
    console.log(r);
    ctx.body = {
      code: 1,
      data: r,
    };
  }).catch(e => {
    ctx.body = {
      code: 1,
        errMsg: handleErr(e),
    };
  });

 return next;
};