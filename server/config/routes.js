console.log('ROUTES ARE ON!');
var admins = require('../controllers/admins');
var waitlists = require('../controllers/waitlists');

module.exports = function(app){
  app.post('/login', admins.login);
  app.post('/register', admins.register);
  app.get('/dashboard/:urlname', waitlists.index_by_urlname);
  app.post('/dashboard', waitlists.create);
  app.get('/waitlist/:urlname', waitlists.customer_view_waitlist);
  app.post('/waitlist/change_status', waitlists.change_status);
}
