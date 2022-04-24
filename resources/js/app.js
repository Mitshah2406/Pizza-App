import axios from 'axios'
import Noty from 'noty'
import { initAdmin } from './admin'

let addCartButtons = document.querySelectorAll('.add-to-cart')
let cartCounter = document.getElementById('cartCounter')
let alerts = document.querySelectorAll('.alert')
 function updateCart (pizza){
    axios.post('/update-cart',pizza).then(res=>{
        new Noty({
            timeout: 3000,
            type:'success',
            text: "Item Added To Cart",
            progressBar:false,
            layout:'bottomRight'
          }).show();
        cartCounter.innerText = res.data.totalQty
    }).catch(e=>{
        new Noty({
            timeout: 3000,
            type:'error',//danger=error=red
            text: "Something Went Wrong!! Please Refresh Website",
            progressBar:false,
            layout:'bottomRight'
          }).show();
    })

}
addCartButtons.forEach((btn) =>{
    // console.log(btn.dataset)
    btn.addEventListener('click',()=>{
        let pizza = JSON.parse(btn.dataset.pizza)
        // console.log(pizza);
        updateCart(pizza)
    })
})

alerts.forEach((alert)=>{
    if(alert){
        console.log('gg');
        setTimeout(() => {
            alert.style.display = "none"
        }, 4000);
    }
})

initAdmin()