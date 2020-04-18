'use strict';

import * as mongoose from 'mongoose';

const User = mongoose.model('User');

export default class UserHelper {

  /**
   * 查找所用用户
   * @return {Promise<string | mongoose.Document[]>} res [description]
   */
  static async findAllUsers() {
    const query = User.find({});
    return await query.exec(function (err, users) {
      if (err) {
        return err.message;
      } else {
        return users;
      }
    });
  }
}
/**
 * 通过电话号码查询
 * @param  {[type]} options.phoneNumber [description]
 * @return {[type]}                     [description]
 */
// exports.findByPhoneNumber = async ({phoneNumber}) => {
// 	var query = User.find({phoneNumber})
// 	var res = null
// 	await query.exec(function(err, user) {
// 		if(err) {
// 			res = {}
// 		}else {
// 			res = user
// 		}
// 	})
// 	// console.log('res====>' + res)
// 	return res;
// }

/**
 * 增加用户
 * @param  {[User]} user [mongoose.model('User')]
 * @return {[type]}      [description]
 */
// exports.addUser = async (user) => {
// 	user = await user.save()
// 	return user
// }
//
// /**
//  * 删除用户
//  * @param  {[type]} options.phoneNumber [description]
//  * @return {[type]}                     [description]
//  */
// exports.deleteUser = async ({phoneNumber}) => {
// 	var flag = false
// 	console.log('flag==========>'+flag)
// 	await User.remove({phoneNumber}, function(err) {
// 		if(err) {
// 			flag = false
// 			// return false
// 		}else{
// 			flag = true
// 		}
//
// 	})
// 	console.log('flag=====await=====>'+flag)
// 	return flag
// }
//