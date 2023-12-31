require("dotenv").config();

const adminsess = process.env.SESSION_ADMIN;
const bcrypt = require("bcrypt");
const starRound = 10;
const sess = process.env.SESSION;

const users = require("../model/mongose/mongouser");
const profile = require("../model/mongose/mongoprofile")
const Product = require("../model/mongose/mongoadmin");
const Cart =require('../model/mongose/mongoosecart')

const { default: mongoose } = require("mongoose");

module.exports = {
  getSignup: (req, res) => {
    if (req.session.name) {
      res.redirect("/user/home");
    } else {
      res.render("user/signup");
    }
  },
  getHome: async (req, res) => {
    if (req.session.name) {
      try {
        const products = await Product.find();
        res.render("user/home", { products });
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    } else {
      res.redirect("/user/login");
    }

    // if(req.session.name)
    // {
    //     res.render('user/home')
    // }
    // else{
    //     res.redirect('/user/login')
    // }
  },
  getLogin: (req, res) => {
    if (req.session.name) {
      res.redirect("/user/home");
    } else {
      res.render("user/login");
    }
  },
  getShowProfile:async(req,res)=>{

   if(req.session.name)
   {
    const sin = req.session.userId;
    let love = await users.aggregate([{$match:{_id: new mongoose.Types.ObjectId(sin)}},{$lookup:{from:"profiles",localField:"_id",foreignField:"userD",as:"fulldetails"}}])
      res.render("user/showProfile",{love})
   }
   else{
    res.redirect("/user/login");
   }

  },
  getCart:async(req,res)=>{
    const id=req.session.userId

    const cartItems=await Cart.find({USERID:id})

  
    res.render('user/cart', { cartItems });
  },

  getProfile: async (req, res) => {
    if(req.session.name)
    {
      const sin = req.session.userId;
      let love = await users.aggregate([{$match:{_id: new mongoose.Types.ObjectId(sin)}},{$lookup:{from:"profiles",localField:"_id",foreignField:"userD",as:"fulldetails"}}])
      res.render("user/profile",{love});
    }
    else{
      res.redirect("/user/login");
    }

    // const result = await profileModel.insert({place, age, details, _id})
    // userModel.updateOne({_id: sin}, {$set: {profileId: result._id}})


  
  },
  getLogout: (req, res) => {
    req.session.destroy((error) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/user/login");
      }
    });
  },
  postSignup: async (req, res) => {
    const { mail, pass } = req.body;

    const hashedPassword = await bcrypt.hash(pass, starRound);

    const existingUser = await users.findOne({ mail });
    if (existingUser) {
      console.error("Duplicate email address. Please use a different email.");
      res.send({ status: false, message: "User already exist.please login" }); // Redirect back to the signup page with an error message
    } else {
      try {
        const newUser = new users({
          mail,
          hashedPassword,
        });

        req.session.userId = newUser._id;
        await newUser.save();
        console.log("User saved successfully!");
        // Redirect to a new page
        req.session.name = sess;

        res.send({ status: true, url: "/user/home" });
      } catch (error) {
        console.error("Error saving user:", error);
        res.send({ status: false, message: "uncatched error." });
      }
    }
  },
  postLogin: async (req, res) => {
    const { mail, pass } = req.body;

    const mailonly = await users.findOne({ mail: mail });

    if (mailonly) {
      const passMatch = await bcrypt.compare(pass, mailonly.hashedPassword);
      if (passMatch && mailonly.isadmin === "admin") {
        req.session.admissess = adminsess;
        res.send({ status: true, url: "/admin/addProduct" });
      } else if (passMatch) {
        req.session.name = sess;
        req.session.userId = mailonly._id;

        res.send({ status: true, url: "/user/home" });
      } else {
        res.send({ status: false, message: "incorrect password" });
      }
    } else {
      res.send({ status: false, message: "no user found.please sign up" });
    }
  },
  postprofileSubmit: async (req, res) => {
    const {mail, name, address, place, phone, district, state } = req.body;
    const man = req.session.userId;
   
        
      await profile.updateOne(
        { userD: man },
        {
          $set: {
            name: name,
            adrees: address,
            place: place,
            phone: phone,
            district: district,
            state: state,
            userD: man
          },
        },{
            upsert:true
        }
      );

      await users.updateOne(
        { _id: man },
        {
          $set: {
            mail: mail,
          },
        }
      );



   
    res.redirect("/user/home");
  },
  postaddtocart:async(req,res)=>{
      const userID=req.session.userId
      const { productId }=req.body
      const pdct= await Product.findOne({_id:productId})

      const existingCartItem = await Cart.findOne({
        USERID: userID,
        PDname: pdct.name,
      })

      if (existingCartItem) {
        // If the product already exists, update the quantity
        existingCartItem.totalQuantity += 1;
        await existingCartItem.save();
      } else {
        // If the product is not in the cart, add a new entry
        await Cart.create({
          PDname: pdct.name,
          PDdiscription: pdct.description,
          PDprice: pdct.price,
          imagePath: pdct.imagePath,
          USERID: userID,
          totalQuantity: 1, // Set initial quantity to 1
        });
      }
      res.send({ success: true });

  },
  decreasequntity:async(req,res)=>{
    console.log(req.body);
    const {productId}=req.body
    const exist=await Cart.findOne({_id:productId})
    console.log(exist);
    if(exist)
    {
      if(exist.totalQuantity>1){
        console.log("anu");
        exist.totalQuantity-=1
        await exist.save()
      }
      else{
        console.log("sudais");
        await exist.deleteOne({});
      }
    }
  res.redirect('/user/cart')
  },
  deletequantity:async(req,res)=>{
    
    const {inp}=req.body
      const exist= await Cart.findOne({_id:inp})
      console.log(exist);

      if(exist)
      {
        await exist.deleteOne({});
      }

    res.send({url:'/user/cart'})

  }
};
