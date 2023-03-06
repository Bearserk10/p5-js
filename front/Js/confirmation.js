const orderId = window.location.search.split("?id=").join("")

let orderCommand = document.querySelector('#orderId');
orderCommand.innerHTML = orderId;


