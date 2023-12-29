require('dotenv').config();
const DBU_URL=process.env.DBU_URL

const mongoose = require('mongoose');
const userDB = mongoose.createConnection(DBU_URL);


const profileschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    adrees: {
        type: String,
        required: true
    },
    place:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    district:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    userD:{
        type:mongoose.Types.ObjectId,
        required:true
    }
  });

  const profile = userDB.model('profile', profileschema);

  module.exports=profile