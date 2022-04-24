import axios from 'axios'
import Noty from 'noty'
import { initAdmin } from './admin'

let addCartButtons = document.querySelectorAll('.add-to-cart')
let cartCounter = document.getElementById('cartCounter')
let alerts = document.querySelectorAll('.alert')
function updateCart(pizza) {
    axios.post('/update-cart', pizza).then(res => {
        new Noty({
            timeout: 3000,
            type: 'success',
            text: "Item Added To Cart",
            progressBar: false,
            layout: 'bottomRight'
        }).show();
        cartCounter.innerText = res.data.totalQty
    }).catch(e => {
        new Noty({
            timeout: 3000,
            type: 'error',//danger=error=red
            text: "Something Went Wrong!! Please Refresh Website",
            progressBar: false,
            layout: 'bottomRight'
        }).show();
    })

}
addCartButtons.forEach((btn) => {
    // console.log(btn.dataset)
    btn.addEventListener('click', () => {
        let pizza = JSON.parse(btn.dataset.pizza)
        // console.log(pizza);
        updateCart(pizza)
    })
})

alerts.forEach((alert) => {
    if (alert) {
        console.log('gg');
        setTimeout(() => {
            alert.style.display = "none"
        }, 4000);
    }
})


//status change

const statuses = document.querySelectorAll('.status_line')
let hiddenStatus = document.querySelector('#hiddenInput')
let orderDetails = hiddenStatus ? hiddenStatus.value : null
orderDetails = JSON.parse(orderDetails)
function updateStatus(order) {
    let stepCompleted = true;
    statuses.forEach(status => {
        let dataProperty = status.dataset.status
        if (stepCompleted) {
            status.classList.add('step-completed')
        }
        if (dataProperty === order.status) {
            stepCompleted=false
            if (status.nextElementSibling) {
                status.nextElementSibling.classList.add('current')
            }
        }
    })

}


updateStatus(orderDetails)
$(document).ready(function() {
    $('#customerOrderTable').DataTable({
        pageLength : 5,
        lengthMenu: [[5, 10, 20, -1], [5, 10, 20,'All']],
    
            "aoColumnDefs": [
                { 'bSortable': false, 'aTargets': [ 0 ] }
             ]
    });
} );
$(document).ready(function() {
    $('#adminOrderTable').DataTable({
        pageLength : 5,
        lengthMenu: [[5, 10, 20, -1], [5, 10, 20,'All']],
        "bSort" : false
    });
} );

// initAdmin()