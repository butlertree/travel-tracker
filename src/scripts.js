

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// // An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

//////////// Import fetch call from apiCalls.js //////////////
// import { fetchAllTheData, allUsers, hydrationData, activityData, sleepData,  postHydrationData } from './apiCalls';

//////////// Import functions from scriptDefinitions //////////////
import {
    showDashboard
    } from './scriptDefinitions';

// const {
//     handleLogin
// } = require('./scriptDefinitions');


// ///////////// Import from domUpdates.js ///////////////

import {  
    userNameInput,
    passwordInput,
    loginButton,
    loginForm,
    loginSection,
    dashboardSection,
  } from './domUpdates';

// //THIS IS WHERE YOUR CODE RUNS FROM

// Event listener for the login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission
  
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
  
    // Check the username and password (example: 'traveler' for both)
    if (username === 'traveler' && password === 'traveler') {
      // Successful login
      loginSection.style.display = 'none'; // Hide login section
      dashboardSection.style.display = 'block'; // Show dashboard section
    } else {
      // Invalid login, show an error message or alert
      alert('Invalid credentials. Please try again.');
    }
  });
  
