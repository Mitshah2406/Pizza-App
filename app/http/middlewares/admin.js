function auth(req,res,next){
    if(req.isAuthenticated()&&req.user.role==="admin"){
        return next()
    }
    req.flash('error','Login As Admin To Access That Page !!')
    return res.redirect('/login')
}

module.exports = auth