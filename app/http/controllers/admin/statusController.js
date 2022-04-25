const Order = require('../../../models/order')

exports.updateStatus = async (req,res)=>{
    Order.updateOne({_id:req.body.orderId},{status:req.body.status},(err,data)=>{
        if(err){
            req.flash('error','Falied To Update Status !!!')
            return res.redirect('/admin/orders')
        }
        else{
            //emit event
            const eventEmitter = req.app.get('eventEmitter')
            const id = req.body.orderId
            const status = req.body.status

            eventEmitter.emit('orderUpdated',{id,status})
            req.flash('success','Updated Status Successfully !!!')
            return res.redirect('/admin/orders')
        }
    })
}