'use strict';

import { Context, Next } from 'koa';
import * as xss from 'xss';
import * as mongoose from 'mongoose';
const Car = mongoose.model('Car');
// const uuid = require('uuid');
import CarHelper from '../dbhelper/carHelper';
import { RESPONSE_TAG } from '../constant';
import { handleErr } from '../utils/errorHeper';

/**
 * 获取车辆信息
 *
 */
export const getCarInfo = async (ctx: Context, next: Next) => {
  const query = ctx.query;

  if (Object.keys(query).length === 0) {
    // 查询所有车辆信息
    const carInfo = await CarHelper.findAllCars();
    if (typeof carInfo === 'string') {
      ctx.body = {
        code: 0,
        errMsg: RESPONSE_TAG.ERROR + carInfo,
      };
    } else {
      ctx.body = {
        code: 1,
        data: carInfo,
      };
    }
  } else {
    const carInfo = await CarHelper.searchCars(query);
    if (typeof carInfo === 'string') {
      ctx.body = {
        code: 0,
        errMsg: RESPONSE_TAG.ERROR + carInfo,
      };
    } else {
      ctx.body = {
        code: 1,
        data: carInfo,
      };
    }
  }

  return next;
};

/**
 * 获取车辆信息
 *
 */
export const addCar = async (ctx: Context, next: Next) => {
  // const query = ctx.query;
  console.log('addcar', ctx.request.body);
  const res = CarHelper.addCar(ctx.request.body);
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
 * 更新车辆信息操作
 */
export const updateCar = async (ctx: Context, next: Next) => {
  try {
    const info: {[key: string]: string}[] = ctx.request.body.info;
    info && info.forEach(async (record) => {
      const car = await Car.findOne({_id: record._id});
      Object.entries(record).forEach(field => {
        if (field[0] !== '_id') {
          car.set(field[0], field[1]);
        }
      });
      await car.save();
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