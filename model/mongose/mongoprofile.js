require('dotenv').config();
const DBU_URL=process.env.DBU_URL

const mongoose = require('mongoose');
const userDB = mongoose.createConnection(DBU_URL);


const profileschema = new mongoose.Schema({
    name: String,
    adrees: String,
    place:String,
    phone:Number,
    district:String,
    state:String,
    userD:{
        type:mongoose.Types.ObjectId,
        required:true
    }
  });

  const profile = userDB.model('profile', profileschema);

  module.exports=profile