import axios from 'axios'
import Noty from 'noty'
import moment from 'moment'
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
        // console.log('gg');
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
    statuses.forEach((status)=>{
        status.classList.remove('step-completed')
        status.classList.remove('current')

    })
    let stepCompleted = true;
    statuses.forEach(status => {
        let dataProperty = status.dataset.status
        if (stepCompleted) {
            status.classList.add('step-completed')
        }
        if (dataProperty === order.status) {
            stepCompleted = false
            if (status.nextElementSibling) {
                status.nextElementSibling.classList.add('current')
            }
        }
    })

}


updateStatus(orderDetails);


$(document).ready(function () {
    $('#customerOrderTable').DataTable({
        pageLength: 5,
        lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'All']],

        "aoColumnDefs": [
            { 'bSortable': false, 'aTargets': [0] }
        ]
    });
});
$(document).ready(function () {
    $('#adminOrderTable').DataTable({
        pageLength: 5,
        lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'All']],
        "bSort": false
    });
});
//socket

let socket = io()
if (orderDetails) { 
    socket.emit('join', `order_${orderDetails._id}`) 
}

let adminAreaPath = window.location.pathname // get the url eg - (/admin/orders)
if(adminAreaPath.includes('admin')) {
    initAdmin(socket)
    socket.emit('join', 'adminRoom')
}

socket.on('orderUpdated',(data)=>{
    let updatedOrder = {...orderDetails} // ... for copying an object
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    updateStatus(updatedOrder);
    new Noty({
        timeout: 3000,
        type: 'success',
        text: `Order Status `, //for first letter in capital
        progressBar: false,
        layout: 'bottomRight'
    }).show();
})