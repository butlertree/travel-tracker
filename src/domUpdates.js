//query selectors go here

const username = document.querySelector('#username')
const password = document.querySelector('#password')
const loginButton = document.querySelector('#submitLogin')
const loginForm = document.querySelector('#login-form');
const travelerName = document.querySelector('#traveler')
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard');
const pendingTripsContainer = document.querySelector('#pending-trips')
///DOM UPDATES TO HERE


//add user name to the dom 
const updateUserName = (traveler) => {
    travelerName.innerHTML ='';
    travelerName.innerHTML += `<h1>${traveler.name}</h1></p>`;
  }

  
//add pending trip images to the dom
  const updatePendingTrips = (pendingTripImageURLs) => {
    // Clear the existing content in the container
    pendingTripsContainer.innerHTML = '';
  
    // Loop through the pendingTripImageURLs and create thumbnail images
    pendingTripImageURLs.forEach((imageUrl) => {
      const tripThumbnail = document.createElement('img');
      tripThumbnail.src = imageUrl; // Set the image URL
      tripThumbnail.alt = 'Pending Trip Thumbnail'; // Set alt text for the image (you can customize this)
  
            // Add a CSS class to the image
    tripThumbnail.classList.add('thumbnail-image');

      // Append the thumbnail to the container
      pendingTripsContainer.appendChild(tripThumbnail);
    });
  };


///EXPORTS GO HERE LIKE THIS TEMPLATE
export {
    username,
    password,
    loginButton,
    loginSection,
    dashboardSection,
    loginForm,
    updateUserName,
    updatePendingTrips
  }