require("dotenv").config();

const adminsess = process.env.SESSION_ADMIN;
const bcrypt = require("bcrypt");
const starRound = 10;
const sess = process.env.SESSION;

const users = require("../model/mongose/mongouser");
const profile = require("../model/mongose/mongoprofile")
const Product = require("../model/mongose/mongoadmin");
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
  getProfile: async (req, res) => {
    const sin = req.session.userId;
    console.log(sin)
    let love = await users.aggregate([{$match:{_id: new mongoose.Types.ObjectId(sin)}},{$lookup:{from:"profiles",localField:"_id",foreignField:"userD",as:"fulldetails"}}])
    // const result = await profileModel.insert({place, age, details, _id})
    // userModel.updateOne({_id: sin}, {$set: {profileId: result._id}})


    res.render("user/profile",{love});
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
    console.log(req.body);
    console.log(mail);
    console.log(pass);

    const hashedPassword = await bcrypt.hash(pass, starRound);
    console.log(hashedPassword);

    const existingUser = await users.findOne({ mail });
    console.log(existingUser);
    console.log(existingUser);
    if (existingUser) {
      console.error("Duplicate email address. Please use a different email.");
      res.send({ status: false, message: "User already exist.please login" }); // Redirect back to the signup page with an error message
    } else {
      try {
        const newUser = new users({
          mail,
          hashedPassword,
        });

        console.log(newUser);
        req.session.userId = newUser._id;
        console.log(req.session.userId);
        await newUser.save();
        console.log("User saved successfully!");
        // Redirect to a new page
        req.session.name = sess;

        res.send({ status: true, url: "/user/home" });
      } catch (error) {
        console.error("Error saving user:", error);
        console.log("nthokkeyo");
        res.send({ status: false, message: "uncatched error." });
      }
    }
  },
  postLogin: async (req, res) => {
    const { mail, pass } = req.body;

    const mailonly = await users.findOne({ mail: mail });

    if (mailonly) {
      const passMatch = await bcrypt.compare(pass, mailonly.hashedPassword);
      console.log(passMatch);
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
    console.log(req.body);
    const man = req.session.userId;
    // const exist = await profile.findOne({ userD: man });
    // const ama=await profile.find()
    // console.log(ama);

    // if (exist) {
        
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


    // } else {
    

        // newOne = new profile({
        //     name: name,
        //     adrees: address,
        //     place: place,
        //     phone: phone,
        //     district: district,
        //     state: state,
        //     userD: man,
        //   });
      
        //   await newOne.save();
    // }

   
    res.redirect("/user/home");
  },
};
