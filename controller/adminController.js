require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;

const adminsess = process.env.SESSION_ADMIN;

const User = require("../model/mongose/mongouser");

const Product = require("../model/mongose/mongoadmin");

module.exports = {
  getAddProduct: (req, res) => {
    if (req.session.admissess) {
      res.render("admin/addProduct");
    } else {
      res.redirect("/admin/login");
    }
  },
  showCollections: async (req, res) => {
    if (req.session.admissess) {
      const products = await Product.find();
      res.render("admin/showCollection", { products });
    } else {
      res.redirect("/admin/login");
    }
  },
  getAdminUpdate: async (req, res) => {
    const PId = req.params.productId;
    const pd = await Product.findById(PId);
    res.render("admin/updateProduct", { pd });
  },
  postAddProducts: async (req, res) => {
    const { name, description, price } = req.body;

    try {
      if (!req.file) {
        return res.status(400).send("No image uploaded.");
      }
      const imagePath = req.file.path;
      const newProduct = new Product({ name, description, price, imagePath });
      await newProduct.save();
      res.redirect("/admin/show");
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  },
  getAdmidLogin: (req, res) => {
    if (req.session.admissess) {
      res.redirect("/admin/addProduct");
    } else {
      res.render("admin/adminLogin");
    }
  },
  getFindUser: async (req, res) => {

    const saaaan=await User.aggregate([{$lookup:{from:"profiles",localField:"_id",foreignField:"userD",as:"fulldetails"}}])
  
    res.render("admin/users", { saaaan });
  },
  postAdminLogin: (req, res) => {
    const user = req.body;
    if (user.username === ADMIN_USER && user.password === ADMIN_PASS) {
      req.session.admissess = adminsess;
      res.send({ status: true, url: "/admin/addproduct" });
    } else {
      res.send({
        status: false,
        url: "/admin/login",
        message: "you are not admin,admin details is wrrong",
      });
    }
  },
  updattingProduct: async (req, res) => {
    const id = req.params.id;

    const { name, description, price } = req.body;
 

    try {
      if (!req.file) {
        return res.status(400).send("No image uploaded.");
      }
      const imagePath = req.file.path;
      const status = await Product.updateOne(
        { _id: id },
        { $set: { name, description, price, imagePath } }
      );
  
    
      res.redirect("/admin/show");
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  },
  getAdminDelete: async (req, res) => {
    const id = req.params.productId;
    await Product.deleteOne({ _id: id });
    res.redirect("/admin/show");
  },
  getAdmidLogout: (req, res) => {
    req.session.destroy((error) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/user/login");
      }
    });
  },
};
