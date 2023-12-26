const express=require('express')
const router=express.Router()




const upload=require('../model/multer/multer')


const {getAddProduct}=require('../controller/adminController')
const {postAddProducts}=require('../controller/adminController')
const {getAdmidLogin}=require('../controller/adminController')
const {postAdminLogin}=require('../controller/adminController')
const {getAdmidLogout}=require('../controller/adminController')
const {showCollections}=require('../controller/adminController')
const {getAdminUpdate}=require('../controller/adminController')
const {getAdminDelete}=require('../controller/adminController')
const {updattingProduct}=require('../controller/adminController')
const {getFindUser}=require('../controller/adminController')

router.get('/addProduct',getAddProduct)
router.get('/login',getAdmidLogin)
router.get('/show',showCollections)
router.get('/update/:productId',getAdminUpdate)
router.get('/delete/:productId',getAdminDelete)
router.get('/users',getFindUser)
router.get('/logout',getAdmidLogout)

router.post('/add-product',upload.single('image'),postAddProducts )
router.post('/logining',postAdminLogin )
router.post('/updated/:id',upload.single('image'),updattingProduct)



module.exports=router


