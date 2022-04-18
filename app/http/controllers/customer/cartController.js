exports.cart = async (req, res) => {
    res.render('customers/cart')
}
exports.update = async (req, res) => {
    if (!req.session.cart) {
        req.session.cart = {
            items: {},
            totalQty: 0,
            totalPrice: 0
        }
    }
    let cart = req.session.cart
    if (!cart.items[req.body._id]) {
        cart.items[req.body._id] = {
            item: req.body,
            Qty: 1
        }
        cart.totalQty = cart.totalQty + 1,
            cart.totalPrice = cart.totalPrice + req.body.price
    } else {
        cart.items[req.body._id].Qty = cart.items[req.body._id].Qty + 1,
            cart.totalQty = cart.totalQty + 1,
            cart.totalPrice = cart.totalPrice + req.body.price
    }
    
    let totalQty = req.session.cart.totalQty;
    console.log(req.session.cart)
    return res.json({ totalQty })
}