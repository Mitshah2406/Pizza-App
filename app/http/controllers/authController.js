
exports.login = async (req,res)=>{
    res.render('auth/login')
}

exports.register = async (req,res)=>{
    res.render('auth/register')
}