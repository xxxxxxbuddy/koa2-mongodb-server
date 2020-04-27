'use strict';

import * as mongoose from 'mongoose';

const Car = mongoose.model('Car');

export default class CarHelper {

  /**
   * 查找所用车辆
   */
  static async findAllCars() {
    const query = Car.find();
    return await query.exec(this.handleRes);
  }

  /**
   * 检索车辆信息
   */
  static async searchCars(filter: mongoose.FilterQuery<any>) {
    const query = Car.find(filter);
    return await query.exec(this.handleRes);
  }

  /**
   * 增加车辆
   */
  static async addCar(data: any) {
    return await Car.create(data);
  }

  static handleRes(err: mongoose.NativeError, data: mongoose.Document[]) {
    if (err) {
      return err.message;
    } else {
      return data;
    }
  }
}