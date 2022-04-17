require('dotenv').config()
const express = require('express')
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
require('./database/db')
const session = require('express-session')
const flash = require('express-flash')
const MongoStore = require('connect-mongo')

//creating app
const app = express()
// use static
app.use(express.static('./public'))

//paths
const views = path.join(__dirname, '/resources/views')
// const layouts = path.join(__dirname, '/resources/layouts')


//assets
app.use(express.json())
app.use(express.urlencoded({extended: false}))


//set template engine
app.use(expressLayout)
app.set('view engine', 'ejs')
app.set('views', views)

// session config
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store:new MongoStore({collectionName:'sessions',mongoUrl:process.env.MONGO_URI}),
    cookie: { maxAge: 1000 * 24 * 24 * 60 } //24hr
}))

//flash
app.use(flash())


// routes
app.use("/", require('./routes/web'))

//port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Connected to ${PORT}`);
})
