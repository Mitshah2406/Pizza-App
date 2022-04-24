function auth(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    req.flash('error','Login To Access That Page !!')
    return res.redirect('/login')
}

module.exports = auth