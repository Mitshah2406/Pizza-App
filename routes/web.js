const router = require('express').Router()
const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customer/cartController')

//home route
router.get('/',homeController.home)

// add pizza 
// router.get('/add',homeController.addPizza)

//cart routes
router.get('/cart',cartController.cart)
router.post('/update-cart',cartController.update)

//auth routes
router.get('/login',authController.login)
router.get('/register',authController.register)


module.exports = router;