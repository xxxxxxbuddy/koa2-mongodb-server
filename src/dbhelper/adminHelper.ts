'use strict';

import * as mongoose from 'mongoose';

const Admin = mongoose.model('Admin');

export default class AdminHelper {

  /**
   * 查找所有用户
   */
  static async Login(info: any) {
    console.log(info);
    const query = Admin.find(info);
    return await query.exec(this.handleRes);
  }

  static async addAdmin(data: any) {
    return await Admin.create(data);
  }

  static handleRes(err: mongoose.NativeError, data: mongoose.Document[]) {
    if (err) {
      return err.message;
    } else {
      return data;
    }
  }

}