const router = require('express').Router()
const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customer/cartController')
const guest = require('../app/http/middlewares/guest')
//home route
router.get('/',homeController.home)

// add pizza 
// router.get('/add',homeController.addPizza)

//cart routes
router.get('/cart',cartController.cart)
router.post('/update-cart',cartController.update)

//auth routes
router.get('/login',guest,authController.login)
router.post('/login',authController.loginUser)
router.get('/register',guest,authController.register)
router.post('/register',authController.registerUser)
router.get('/logout',authController.logout)


module.exports = router;