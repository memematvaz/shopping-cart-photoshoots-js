'use strict'

const cart = document.getElementById('cart');
const cartList = document.querySelector('#cart-list tbody');
const emptyCartButton = document.querySelector('#empty-cart')

addClickListeners()

function addClickListeners() {
    const addCartButtons = document.querySelectorAll('.add-cart')
    for (let button of addCartButtons) {
      button.addEventListener('click', addCart)
    }
  }


cart.addEventListener('click', deleteCart);
emptyCartButton.addEventListener('click', emptyCart);
document.addEventListener('DOMContentLoaded', readLocalStorage);

function addCart(e) {
    e.preventDefault();

    const session = e.target.parentElement.parentElement;

    readSessionDates(session);
}


function readSessionDates(session) {
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

        cartList.appendChild(row);
        setLocalStorage(objectSession);
}

{/*function pushCart(objectSession) {
    const createRow = (tbody, cell) => {
    const cartList = document.querySelector('#cart-list tbody');
    const row = document.createElement('tr');

    cell.forEach (tbody => {
        const cell = document.createElement ('td');
        const image = document.createElement('image');
        image.setAttribute('src', `${objectSession.image}`)
        cell.appendChild(image);
        cell.appendChild(document.createTextNode(`${objectSession.title}`));
        cell.appendChild(document.createTextNode(`${objectSession.price}`));
        row.appendChild(cell);
    })
cartList.appendChild(row); */}

function deleteCart(e) {
    e.preventDefault();

    let session, 
    sessionId;
    
    if(e.target.classList.contains('delete-course')) {
        e.target.parentElement.parentElement.remove();
        session = e.target.parentElement.parentElement;
        sessionId = session.querySelector('a').getAttribute('data-id');
    }
    deleteLocalStorage(sessionId)
}

function emptyCart() {
    while(cartList.firstChild){
        cartList.removeChild(cartList.firstChild)
    }
    emptyLocalStorage();
}

function setLocalStorage(objectSession){
    let sessions;

    sessions = getLocalStorage();

    sessions.push(objectSession);

    localStorage.setItem('sessions', JSON.stringify(sessions))
}


function getLocalStorage(){
    let sessionsLS;

    if(localStorage.getItem('sessions') === null) {
        sessionsLS = [];
    } else {
        sessionsLS = JSON.parse(localStorage.getItem('sessions'));
    }
    return sessionsLS;
}

function readLocalStorage(){
    let sessionsLS;
    sessionsLS = getLocalStorage();

    sessionsLS.forEach(function(objectSession)  {
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
    
            cartList.appendChild(row);
    });
}

function  deleteLocalStorage(session) {
    let sessionsLS;
    sessionsLS = getLocalStorage();

    sessionsLS.forEach(function(sessionLS, index) {
        if(sessionLS.id === session){
            sessionsLS.splice(index, 1);

        }
    });

    localStorage.setItem('sessions', JSON.stringify(sessionsLS))
}

function emptyLocalStorage() {
    localStorage.clear();
}
