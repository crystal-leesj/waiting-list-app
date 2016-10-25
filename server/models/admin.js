console.log('ADMIN MODERL IS ON!');

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
  business_name: {
    type: String,
    required: true,
    trim: true
  },
  url_name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  phone: {
    type: Number,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true
});


// gnerating hashed password
adminSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// checking if password is valid
adminSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

adminSchema.pre('save', function(done) {
    this.password = this.generateHash(this.password);
    done();
});


mongoose.model('Admin', adminSchema);
