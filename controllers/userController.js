var mongoose = require('mongoose');
var User = mongoose.model('UserModel');

exports.list_users = function(req, res) {
  User.find({}, function(err,user){
    if (err)
      res.send(err);
      res.json(user);
    }); 
};


exports.create_user = function(req, res) {
  var new_user = new User(req.body);
  new_user.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.find_user = function(req, res) {
  console.log('debug req', req.params.facebookId)
  User.findOne({facebookId: req.params.facebookId}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.update_user = function(req, res) {
  User.findOneAndUpdate({facebookId: req.params.facebookId}, req.body, {new: true}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.delete_user = function(req, res) {
  User.remove({
    facebookId: req.params.facebookId
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