// express requiring
const express=require("express")
const path=require('path')
// requiring dotenv
require('dotenv').config();
const nocache = require("nocache");
// requiring routes
const useroutes=require('./routes/userRouts')
const adminroutes=require('./routes/adminRoutes')


const app=express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session
const session = require('express-session')
app.use(session({secret:"chinnu",resave:false,saveUninitialized:true,cookie: {maxAge: 30 * 60 * 1000,   },}))


const port=process.env.PORT

// connecting with ejs file
app.set('view engine','ejs')

// connecting static files
app.use('/public',express.static('public'))
app.use('/public', express.static(path.join(__dirname, 'public')));



// using routes
app.use('/user',useroutes)
app.use('/admin',adminroutes)


app.use(nocache());










app.listen(port,()=>{
    console.log(`running the port ${port}`);
})































// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/userdata');

// const userSchema = new mongoose.Schema({
//     email: { type: String, unique: true },
//     pass: String,
//   });

//   const User = mongoose.model('User', userSchema);


//   app.get('/',(req,res)=>{
//     res.render("signup")

// })
// app.get('/home',(req,res)=>{
//     res.render('home')
// })

// app.post('/signup', async (req, res) => {
//     // Get data from the form
//     const { email, pass } = req.body;
//     console.log(req.body);
//     // Create a new user document
//     const newUser = new User({
//       email,
//       pass,
//     });
  
//     // Save the user to the database
//     try {
//         await newUser.save();
//         console.log('User saved successfully!');
//         // Redirect to a new page
//         res.redirect('/home');
//     } catch (error) 
//     {
//         if (error.code === 11000) {
//             // Duplicate key error
//             console.error('Duplicate email address. Please use a different email.');
//             res.redirect('/signup'); // Redirect back to the signup page with an error message
//         } else {
//             // Other errors
//             console.error('Error saving user:', error);
//             res.redirect('/');
//         }
//         // console.log(error.message);
//     }
//   });

