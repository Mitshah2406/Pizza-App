const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to mongo....')
}).catch((err)=>{
    console.log("Mongo COnnection Error !!! --> " + err);
})