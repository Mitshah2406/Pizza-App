const express = require('express')
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')

//creating app
const app = express()
// use static
app.use(express.static('./public'))

//paths
const views = path.join(__dirname, '/resources/views')
// const layouts = path.join(__dirname, '/resources/layouts')

//set template engine
app.use(expressLayout)
app.set('view engine','ejs')
app.set('views',views)


//sample route
app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/cart',(req,res)=>{
    res.render("customers/cart")
})

//defining port
const PORT = process.env.PORT || 5000;



app.listen(PORT,()=>{
    console.log(`Connected to ${PORT}`);
})
