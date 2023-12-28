require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;

const adminsess = process.env.SESSION_ADMIN;

const User = require("../model/mongose/mongouser");

const profile = require("../model/mongose/mongoprofile")

const Product = require("../model/mongose/mongoadmin");

module.exports = {
  getAddProduct: (req, res) => {
    if (req.session.admissess) {
      console.log(req.session.admissess);
      res.render("admin/addProduct");
    } else {
      res.redirect("/admin/login");
    }
  },
  showCollections: async (req, res) => {
    if (req.session.admissess) {
      console.log(req.session.admissess);
      const products = await Product.find();
      res.render("admin/showCollection", { products });
    } else {
      res.redirect("/admin/login");
    }
  },
  getAdminUpdate: async (req, res) => {
    const PId = req.params.productId;
    const pd = await Product.findById(PId);
    console.log(pd);
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
      console.error(error);
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
    console.log(saaaan);
    // const users = await User.find();
    // console.log(users);

    res.render("admin/users", { saaaan });
  },
  postAdminLogin: (req, res) => {
    const user = req.body;
    console.log(user);
    console.log(ADMIN_USER, ADMIN_PASS);
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
    console.log(id);

    const { name, description, price } = req.body;
    console.log(name);
    console.log(description);
    console.log(price);

    try {
      if (!req.file) {
        return res.status(400).send("No image uploaded.");
      }
      const imagePath = req.file.path;
      console.log(imagePath);
      const status = await Product.updateOne(
        { _id: id },
        { $set: { name, description, price, imagePath } }
      );
      console.log(status);
      // await newProduct.save();
      res.redirect("/admin/show");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  getAdminDelete: async (req, res) => {
    const id = req.params.productId;
    console.log(id);
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
