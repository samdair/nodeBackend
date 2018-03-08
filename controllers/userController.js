var mongoose = require('mongoose');
var User = mongoose.model('UserModel');

exports.getUsers = function(req, res) {
  User.find({}, function(err,user){
    if (err)
      res.send(err);
      res.json(user);
    }); 
};


exports.addUser = function(req, res) {
  var new_user = new User(req.body);
  new_user.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.getUser = function(req, res) {
  console.log('debug req', req.params.userId)
  User.findOne({userId: req.params.userId}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.updateUser = function(req, res) {
  User.findOneAndUpdate({userId: req.params.userId}, req.body, {new: true}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.deleteUser = function(req, res) {
  User.remove({
    userId: req.params.userId
  }, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};


//User.paginate({}, { page: 2, limit: 5 }, function(err, result) {
  //result.docs
  // result.total
  // result.limit - 10
  // result.page - 3
  // result.pages 
  //});