const Order = require('../../../models/order')
const moment = require('moment')
const order = require('../../../models/order')
exports.orderPizza = async (req, res) => {
    const { phone, address } = req.body
    console.log(req.body)
    if (!phone || !address) {
        req.flash('error', 'All fields are required')
        return res.redirect('/cart')
    }
    const order = new Order({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone,
        address
    })
    try {
        order.save()
        req.flash('success', 'Order Placed SuccessFully')
        delete req.session.cart
        return res.redirect('/customer/orders')
    } catch (err) {
        req.flash('error', 'Something Went Wrong !!')
        return res.redirect('/cart')
    }
}

exports.showOrders = async (req, res) => {
    const orders = await Order.find({ customerId: req.user._id }, null, { sort: { 'createdAt': -1 } })

    res.render('customers/orders', { orders, moment })
}

exports.trackOrder = async (req, res) => {
    try {
        const order = await Order.findById({ _id: req.params.id })
        if (req.user._id.toString() === order.customerId.toString()) {
            res.render('customers/trackOrder', { order })
        }
        else {
            req.flash('error', 'Failed To Track Order !!!')
            res.redirect('/customers/orders')
        }
    }
    catch (err) {
        res.send('404 - track order ')
    }
}