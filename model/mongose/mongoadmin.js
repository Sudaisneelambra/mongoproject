

require('dotenv').config();

const DBA_URL=process.env.DBA_URL

const mongoose = require('mongoose');

const productDB = mongoose.createConnection(DBA_URL);

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    imagePath: String
  });
  
  const Product = productDB.model('Product', productSchema);

  module.exports=Product