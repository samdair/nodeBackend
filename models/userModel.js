var mongoose = require('mongoose');
var mangoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  userId: String,
  token: String,
  name: String,
  gender: String,
  email: String,
  likes: Array,
  followingBloggers: Array,
  picture: String,
}, { timestamps: true });

UserSchema.plugin(mangoosePaginate);
module.exports = mongoose.model('UserModel', UserSchema);