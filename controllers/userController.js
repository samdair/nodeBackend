var mongoose = require('mongoose');
var User = mongoose.model('UserModel');
var FCM = require('fcm-node');
var apiKey = process.env.API_KEY;
var fcm = new FCM(apiKey);
var nodemailer = require('nodemailer');
 
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

exports.notify = function(req, res) {
  User.find({}, function(err,user){
    if (err)
      res.send(err);

    const registration_ids = user.map(item => item.token);
    var message = {  
        registration_ids: registration_ids, 
        collapse_key: req.body.collapse_key,
        notification: req.body.notification,
        data: req.body.data
    };
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
            res.send(message);
        }
    });
  }); 
};

exports.mail = function(req, res) {
  User.find({}, function(err,user){
    if (err)
      res.send(err);

    const emailList = user.map(item => item.email);
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: req.body.auth
    });

    var mailOptions = {
        from: req.body.from, // sender address
        to: emailList, // list of receivers
        subject: req.body.subject, // Subject line
        html: req.body.html //, // plaintext body
        // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.json({yo: 'error'});
        }else{
            console.log('Message sent: ' + info.response);
            res.json({yo: info.response});
        };
    });

  }); 
};


//User.paginate({}, { page: 2, limit: 5 }, function(err, result) {
  //result.docs
  // result.total
  // result.limit - 10
  // result.page - 3
  // result.pages 
  //});