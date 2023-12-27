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


router.get('/signup',getSignup)
router.get('/home',getHome)
router.get('/logout',getLogout)
router.get('/login',getLogin)
router.get('/profile',getProfile)



router.post('/signup',postSignup)
router.post('/login',postLogin)
router.post('/profileSubmit',postprofileSubmit)





module.exports=router