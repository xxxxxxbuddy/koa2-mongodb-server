'use strict';

import * as mongoose from 'mongoose';

const ParkingLot = mongoose.model('ParkingLot');

export default class ParkinglotHelper {

  /**
   * 查找所有停车场
   */
  static async findAllParkinglots() {
    const query = ParkingLot.find();
    return await query.exec(this.handleRes);
  }

  /**
   * 检索停车场信息
   */
  static async searchParkinglots(filter: mongoose.FilterQuery<any>) {
    const query = ParkingLot.find(filter);
    return await query.exec(this.handleRes);
  }

  /**
   * 增加停车场
   */
  static async addParkinglot(data: any) {
    return await ParkingLot.create(data);
  }

  /**
   * 删除停车场
   */
  static async deleteParkinglot(data: any[]) {
    return await ParkingLot.deleteMany({_id: {$in: data}});
  }

  static handleRes(err: mongoose.NativeError, data: mongoose.Document[]) {
    if (err) {
      return err.message;
    } else {
      return data;
    }
  }
}