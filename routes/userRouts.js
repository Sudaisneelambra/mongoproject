const express=require('express')
const router=express.Router()

// requiring routes 

const{getSignup}=require('../controller/userController')
const{getHome}=require('../controller/userController')
const{getLogin}=require('../controller/userController')
const{postSignup}=require('../controller/userController')
const{postLogin}=require('../controller/userController')
const{getLogout}=require('../controller/userController')
const{getProfile}=require('../controller/userController')
const{postprofileSubmit}=require('../controller/userController')
const{getShowProfile}=require('../controller/userController')
const{getCart}=require('../controller/userController')
const{postaddtocart}=require('../controller/userController')
const{decreasequntity}=require('../controller/userController')
const{deletequantity}=require('../controller/userController')


router.get('/signup',getSignup)
router.get('/home',getHome)
router.get('/logout',getLogout)
router.get('/login',getLogin)
router.get('/profile',getProfile)
router.get('/showProfile',getShowProfile)
router.get('/cart',getCart)





router.post('/signup',postSignup)
router.post('/login',postLogin)
router.post('/profileSubmit',postprofileSubmit)
router.post('/AddToCart',postaddtocart)
router.post('/decrease',decreasequntity)
router.post('/delete',deletequantity)








module.exports=router