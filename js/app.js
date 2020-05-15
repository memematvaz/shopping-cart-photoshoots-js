'use strict'

const cart = document.getElementById('cart');
const cartList = document.querySelector('#cart-list tbody')

addClickListeners()

function addClickListeners() {
    const addCartButtons = document.querySelectorAll('.add-cart')
    for (let button of addCartButtons) {
      button.addEventListener('click', addCart)
    }
  }


function addCart(e) {
    e.preventDefault();

    const session = e.target.parentElement.parentElement;

    readCourseDates(session);
}


function readCourseDates(session) {
    const objectSession = {
        image: session.querySelector('img').src,
        title: session.querySelector('h4').textContent,
        price: session.querySelector('.price span').textContent,
        id: session.querySelector('a').getAttribute('data-id')
    }
    pushCart(objectSession);
}

function pushCart(objectSession) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${objectSession.image}">
        </td>
        <td>${objectSession.title}</td>
        <td>${objectSession.price}</td>
        <td>
            <a href="#" class="delete-course" data-id="${objectSession.id}">X</a>
        </td>`;

        console.log(row)
        cartList.appendChild(row);
}