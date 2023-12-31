
const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    mail: {
      type: String,
      required: true
  },
    hashedPassword: {
      type: String,
      required: true
  },
    isadmin:{type:String,default:"user"}
  });

  const users = mongoose.model('users', userSchema);

  module.exports=users
 