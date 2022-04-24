const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

exports.login = async (req, res) => {
    res.render('auth/login')
}

exports.loginUser = async (req,res,next)=>{
    function getUrl(req){
        return req.user.role == "admin" ? 'admin/orders' : 'customer/orders'
    }
    const {  email, password } = req.body;
    if ( !email || !password) {
        req.flash('error', 'All Fields Are Required..')
        return res.redirect('/login')
    }
    passport.authenticate('local',(err,user,info)=>{
            if(err){
                req.flash('error',info.message)
                return next(err)
            }
            if(!user){
                req.flash('error',info.message)
                return res.redirect('/login')
            }
            req.logIn(user, (err) => {
                if(err) {
                    req.flash('error', info.message ) 
                    return next(err)
                }
    
                // return res.redirect(req.user.role==="admin"?'admin/orders':'customer/orders')
                return res.redirect(getUrl(req))
            })
    })(req,res,next)
}

exports.register = async (req, res) => {
    res.render('auth/register')
}

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        req.flash('error', 'Enter Valid Credentials..')
        req.flash('name', name)
        req.flash('email', email)
        return res.redirect('/register')
    }

    //check email taken or wot

    User.exists({ email }, (err, result) => {
        if (result) {
            req.flash('error', 'Email Already Taken !!!')
            req.flash('name', name)
            req.flash('email', email)
            return res.redirect('/register')
        } })
        let hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name,
            email,
            password:hashedPassword
        })
        user.save().then((user) => {
            return res.redirect('/')
        }).catch(err => {
            req.flash('error', 'Something Went Wrong...')
            req.flash('name', name)
            req.flash('email', email)

            return res.redirect('/register')
        })
   
}
exports.logout = async(req,res)=>{
    console.log('logout')
    req.logout()
   return res.redirect('/login')
}