//query selectors go here

const username = document.querySelector('#username')
const password = document.querySelector('#password')
const loginButton = document.querySelector('#submitLogin')
const loginForm = document.querySelector('#login-form');
const travelerName = document.querySelector('#traveler')
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard');
///DOM UPDATES TO HERE

const updateUserName = (traveler) => {
    travelerName.innerHTML ='';
    travelerName.innerHTML += `<h1>${traveler.name}</h1></p>`;
  }



///EXPORTS GO HERE LIKE THIS TEMPLATE
export {
    username,
    password,
    loginButton,
    loginSection,
    dashboardSection,
    loginForm,
    updateUserName
  }