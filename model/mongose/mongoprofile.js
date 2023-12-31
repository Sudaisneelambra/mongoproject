

const mongoose = require('mongoose');

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

  const profile = mongoose.model('profile', profileschema);

  module.exports=profile