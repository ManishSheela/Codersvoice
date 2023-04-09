const UserModel = require('../models/user-model')
class userService {
  async findUser(filter) {
    return await UserModel.findOne(filter);
  }
  async createUser(data) {
    return await UserModel.create(data);
  }
}
module.exports = new userService();