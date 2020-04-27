'use strict';

import { Next } from 'koa';

import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const CarSchema = new Schema({
  name: String,
  car_brand: String,
  plate_number: String,
  car_model: String,
  car_type: Number,
  user_id: String,
  meta: {
    createAt: {
      type: Date,
      dafault: Date.now(),
    },
    updateAt: {
      type: Date,
      dafault: Date.now(),
    },
  },
});

// Defines a pre hook for the document.
CarSchema.pre('save', function(next: Next) {
  if (this.isNew) {
    this.update({meta: {
      createAt: Date.now(),
      updateAt: Date.now(),
    }});
  } else {
    this.update({meta: {
      updateAt: Date.now(),
    }});
  }
  next();
});


/**
 * 定义模型Car
 * 模型用来实现我们定义的模式，调用mongoose.model来编译Schema得到Model
 * @type {[type]}
 */
// 参数Car 数据库中的集合名称, 不存在会创建.
const CarModel = mongoose.model('Car', CarSchema);

module.exports = CarModel;

/**
 * nodejs中文社区这篇帖子对mongoose的用法总结的不错：https://cnodejs.org/topic/548e54d157fd3ae46b233502
 */
