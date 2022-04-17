import axios from 'axios'
let addCartButtons = document.querySelectorAll('.add-to-cart')

 function updateCart (pizza){
    console.log("inside updateCart");
    axios.post('/update-cart',pizza).then(res=>{
        console.log(res)
    })

}
addCartButtons.forEach((btn) =>{
    console.log(btn.dataset)
    btn.addEventListener('click',()=>{
        let pizza = JSON.parse(btn.dataset.pizza)
        // console.log(pizza);
        updateCart(pizza)
    })
})
