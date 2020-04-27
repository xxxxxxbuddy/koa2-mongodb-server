'use strict';

import * as mongoose from 'mongoose';

const Carport = mongoose.model('Carport');
const ParkingLot = mongoose.model('ParkingLot');

export default class CarportHelper {

  /**
   * 查找所用车位
   */
  static async findAllCarports() {
    const query = Carport.find();
    return await query.exec(this.handleRes);
  }

  /**
   * 检索车位信息
   */
  static async searchCarports(filter: mongoose.FilterQuery<any>) {
    const query = Carport.find(filter);
    return await query.exec(this.handleRes);
  }

  /**
   * 增加车位
   */
  static async addCarport(data: any) {
    return await Carport.create(data);
  }

  static async getParkinglotState() {
    const parkinglotList = await ParkingLot.find();
    const res: any[] = [];
    for (const parkinglot of parkinglotList) {
      const carports = await Carport.find({ parkinglot_id: parkinglot._id }, this.handleRes);
      res.push({
        parkiglot_id: parkinglot._id,
        name: parkinglot.get('name'),
        carport_num: carports.length,
        idle_num: carports.filter(n => n.get('occupancy_state') == 0).length,
      });
    }
    return res;
  }

  static handleRes(err: mongoose.NativeError, data: mongoose.Document[]) {
    if (err) {
      return err.message;
    } else {
      return data;
    }
  }
}