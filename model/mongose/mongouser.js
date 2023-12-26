
require('dotenv').config();
const DBU_URL=process.env.DBU_URL

const mongoose = require('mongoose');
const userDB = mongoose.createConnection(DBU_URL);


const userSchema = new mongoose.Schema({
    mail: String,
    hashedPassword: String,
    isadmin:{type:String,default:"user"}
  });

  const users = userDB.model('users', userSchema);

  module.exports=users