console.log('WAITLIST CONTROLLER IS ON!');
require('../config/mongoose');
var mongoose = require('mongoose');

var Waitlist = mongoose.model('Waitlist');
var Admin = mongoose.model('Admin');

function WaitlistController(){
  this.create = function(req,res){
    console.log("THIS IS WAITLIST REQ BODY: ", req.body);
    var waitlist = new Waitlist({
      _adminId:req.body.adminId,
      name: req.body.new_waitlist.name,
      party_size: req.body.new_waitlist.party_size,
      phone: req.body.new_waitlist.phone,
      status: 'Waiting'
    });
    waitlist.save(function(err,waitlist){
      if(err){
        console.log("ERR** WAITLIST is NOT CREATED!");
      } else {
        res.json({placeholder:'create_dashboard', waitlist:waitlist});
      }
    })
  }
  this.index_by_urlname = function(req,res){
    Admin.findOne({url_name:req.params.urlname}).exec(function(err,admin){
      // console.log('WHAT IS ADMIN :',admin);
      if (admin) {
        Waitlist.find({_adminId:admin._id}).exec(function(err,waitlists){
          res.json({placeholder:'index_dashabord', waitlists:waitlists});
        })
      } else {
        res.json({placeholder:'error', message:'URL NOT FOUND'})
      }
    })
  }
  this.customer_view_waitlist = function(req,res){
    console.log('req.params.urlname:::',req.params.urlname);
    Admin.findOne({url_name:req.params.urlname}).exec(function(err,admin){
      // console.log('WHAT IS ADMIN :',admin);
      if (admin) {
        Waitlist.find({_adminId:admin._id, status:"Waiting"}).exec(function(err,waitlists){
          res.json({placeholder:'customer_view_waitlist', waitlists:waitlists, business_name:admin.business_name, phone_number:admin.phone});
        })
      } else {
        res.json({placeholder:'error', message:'URL NOT FOUND'})
      }
    })
  }
  this.change_status = function(req,res){
    Waitlist.findOne({_id:req.body.id}).exec(function(err, waitlist){
      waitlist.status = req.body.status;
      waitlist.save(function(err,waitlist){
        res.json({placeholder:'wichlist_change_status', waitlist:waitlist});
      })
    })
  }
}

module.exports = new WaitlistController();
