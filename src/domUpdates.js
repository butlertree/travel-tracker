//query selectors go here

const username = document.querySelector('#username')
const password = document.querySelector('#password')
const loginButton = document.querySelector('#submitLogin')
const loginForm = document.querySelector('#login-form');
// const loginSection = document.querySelector('#login-section')
// const dashboardSection = document.querySelector('#dashboard')

const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard');
///DOM UPDATES TO HERE




///EXPORTS GO HERE LIKE THIS TEMPLATE
export {
    username,
    password,
    loginButton,
    loginSection,
    dashboardSection,
    loginForm
  }