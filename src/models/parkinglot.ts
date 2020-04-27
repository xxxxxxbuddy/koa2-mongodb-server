'use strict';

import { Next } from 'koa';

import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ParkingLotSchema = new Schema({
  geolocation: String,
  tenant_id: String,
  name: String,
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
ParkingLotSchema.pre('save', function(next: Next) {
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

const ParkingLotModel = mongoose.model('ParkingLot', ParkingLotSchema);

module.exports = ParkingLotModel;

/**
 * nodejs中文社区这篇帖子对mongoose的用法总结的不错：https://cnodejs.org/topic/548e54d157fd3ae46b233502
 */
