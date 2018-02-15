
module.exports = function(app) {
  var user = require('../controllers/userController');

  app.route('/user')
    .get(user.list_users)
    .post(user.create_user)


  app.route('/user/:facebookId')
    .get(user.find_user)
    .put(user.update_user)
    .delete(user.delete_user);
};
