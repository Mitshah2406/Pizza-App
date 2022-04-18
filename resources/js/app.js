import axios from 'axios'
import Noty from 'noty'


let addCartButtons = document.querySelectorAll('.add-to-cart')
let cartCounter = document.getElementById('cartCounter')


 function updateCart (pizza){
    console.log("inside updateCart");
    axios.post('/update-cart',pizza).then(res=>{
        new Noty({
            timeout: 3000,
            type:'success',
            text: "Item Added To Cart"
          }).show();
        cartCounter.innerText = res.data.totalQty
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
