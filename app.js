require('dotenv').load();
var express = require('express');
var FCM = require('fcm-node');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/userModel');
var Video = require('./models/videoModel');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/myappdb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected successfully to ', db.name);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var index = require('./routes/index');
app.use('/', index);

//ROUTERS
var userRoutes = require('./routes/userRoutes'); 
var videoRoutes = require('./routes/videoRoutes'); 
userRoutes(app);
videoRoutes(app);



 // Firebase Notififcation 

    var apiKey = process.env.API_KEY;
    var fcm = new FCM(apiKey);
    var ios_token = 'deD6KV-sIdw:APA91bFRN4ZZTGZKpJh_oThFpCCr9Coib1wYxsQiJw3ZgOwWsc99NrWVeOVBaPfJVEzoyQ4-Ro-KhdvLUyizk4Gh_qD3yFcne9PoFcLlAQ8_E5jrbmShvEAosU4e6XoO9qFvrxh38f3A'
    var android_token = 'cnc9xJ6yM1M:APA91bFF17S3vXnirtp9exCnYiHwXKsfA-XeSXzAOpKDAvO_VIdPy0_oXTJPjL-On0A5asgsdXKKR_H4TkRJk62c6Dm3ECosMKUDTWvyPJJmWtAJoAy2QQBYFBV1BzHVeqzLSeD8CLWR'
    var message = { 
        registration_ids: [ios_token, android_token], 
        collapse_key: 'com.myapp',
        
        notification: {
            title: 'Title of your push notification', 
            body: 'Body of your push notification' 
        },
        
        data: {  
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    };
    
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
 







// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
