console.log('WAITLIST MODEL IS ON!');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var waitlistSchema = new Schema({
  name: String,
  party_size: Number,
  phone: Number,
  status: String,
  _adminId: {type: Schema.Types.ObjectId, ref: 'Admin'},
}, { timestamps: true
});

var Waitlist = mongoose.model('Waitlist', waitlistSchema);
