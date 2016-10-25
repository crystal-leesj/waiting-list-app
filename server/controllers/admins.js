console.log('ADMINS CONTROLLER IS ON!');
require('../config/mongoose');
var mongoose = require('mongoose');
var Admin = mongoose.model('Admin');

function AdminsController(){

  this.register = function(req,res){
    console.log("CHECK::::",req.body);
    var admin = new Admin({
      business_name: req.body.business_name,
      url_name: req.body.url_name,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
    });
    admin.save(function(err,new_admin) {
      if(err){
        console.log("something went wrong!",err);
        if (err.code = 11000){
          res.json({placeholder:'error', message:"Email address is already in use!"});
        }
      } else {
        res.json({placeholder:'register', admin:new_admin});
      }
    })
  };

  this.login = function(req,res){
    Admin.findOne({email:req.body.email},function(err, admin){
      console.log('What is ERR?????',err, 'What is ADMIN?????',admin);
      // err and admin are null. that is why i use !admin(false false)
      if (!admin){
        res.json({placeholder:'error', message:"Email is not found!"});
      }
      else if (admin.validPassword(req.body.password)){
        res.json({placeholder:'login', admin:admin});
      }
      else {
        res.json({placeholder:'error', message:"Password does not match!"});
      }
    })
  }


}


module.exports = new AdminsController();
