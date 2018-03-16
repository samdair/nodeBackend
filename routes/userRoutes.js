
module.exports = function(app) {
  var user = require('../controllers/userController');

  app.route('/user')
    .get(user.getUsers)
    .post(user.addUser)

  app.route('/user/:userId')
    .get(user.getUser)
    .put(user.updateUser)
    .delete(user.deleteUser);

  app.route('/notify')
    .post(user.notify)

  app.route('/mail')
    .post(user.mail)

};
