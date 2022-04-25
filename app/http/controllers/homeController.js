const Menu = require('../../models/menu')

exports.home = async (req, res) => {
    try{
        const pizzas = await Menu.find()
        res.render('home',{pizzas})
    }
    catch(err){
        res.send("404 - Error in finding pizza !!!!   "+err)
    }
   
}

// exports.addPizza = async (req, res) => {
//     const data = await new Menu({
//         "name": "Pepperoni",
//         "image": "pizza.png",
//         "price": "500",
//         "size": "medium"
//     })
// //bring dummy data from"./pizzaData/pizza-menu.json" file
//     await data.save()
//     res.send('send')
// }