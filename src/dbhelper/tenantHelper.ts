'use strict';

import * as mongoose from 'mongoose';

const Tenant = mongoose.model('Tenant');

export default class TenantHelper {

  /**
   * 查找所有租户
   */
  static async findAllTenants() {
    const query = Tenant.find();
    return await query.exec(this.handleRes);
  }

  /**
   * 检索租户信息
   */
  static async searchTenants(filter: mongoose.FilterQuery<any>) {
    const query = Tenant.find(filter);
    return await query.exec(this.handleRes);
  }

  /**
   * 增加租户
   */
  static async addTenant(data: any) {
    return await Tenant.create(data);
  }

  /**
   * 删除租户
   */
  static async deleteTenant(data: any[]) {
    return await Tenant.deleteMany({_id: {$in: data}});
  }

  static async Login(info: any) {
    console.log(info);
    const query = Tenant.find(info);
    return await query.exec(this.handleRes);
  }

  static handleRes(err: mongoose.NativeError, data: mongoose.Document[]) {
    if (err) {
      return err.message;
    } else {
      return data;
    }
  }
}