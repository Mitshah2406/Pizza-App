const router = require('express').Router()
const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customer/cartController')
const orderController = require('../app/http/controllers/customer/orderController')
const adminOrderController = require('../app/http/controllers/admin/orderController')
const statusController = require('../app/http/controllers/admin/statusController')
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const admin = require('../app/http/middlewares/admin')
//home route
router.get('/', homeController.home)

// add pizza 
// router.get('/add',homeController.addPizza)

//cart routes
router.get('/cart', cartController.cart)
router.post('/update-cart', cartController.update)

//auth routes
router.get('/login', guest, authController.login)
router.post('/login', authController.loginUser)
router.get('/register', guest, authController.register)
router.post('/register', authController.registerUser)
router.get('/logout', authController.logout)

//customer route
router.post('/order', auth, orderController.orderPizza)
router.get('/customer/orders', auth, orderController.showOrders)

//admin route
router.get('/admin/orders', admin, adminOrderController.showOrders)
router.post('/admin/orders/status', admin, statusController.updateStatus)


module.exports = router;