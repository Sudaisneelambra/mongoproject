

require('dotenv').config();

const DBA_URL=process.env.DBA_URL

const mongoose = require('mongoose');

const productDB = mongoose.createConnection(DBA_URL);

const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
  },
    description: {
      type: String,
      required: true
  },
    price: {
      type: Number,
      required: true
  },
    imagePath: {
      type: String,
      required: true
  },
  });
  
  const Product = productDB.model('Product', productSchema);

  module.exports=Product