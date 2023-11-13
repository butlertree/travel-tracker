

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// // An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

//////////// Import fetch call from apiCalls.js //////////////
import { 
    fetchAllTheData,
    allTravelers,
    allTrips,
    allDestinations
} from './apiCall';

//////////// Import functions from scriptDefinitions //////////////
import {
    calculateTripCost,
    addDataToCurrentTraveler,
    getImageURLsOfPendingTrips,
    getImageURLsOfPastTrips,
    getImageURLsOfFutureTrips,
    calculateTotalSpentOnTrips
    } from './scriptDefinitions';



// ///////////// Import from domUpdates.js ///////////////

import {
    tripSelectionIndex,
    submitTripButton,
    calculateCost,
    travelersInput,
    durationInput,
    dateInput,
    updateCostOfSingleTrip,
    updateDestinationDropdown,
    updateTotalAmountSpent,
    updateFutureTrips,
    updatePastTrips,
    updatePendingTrips,
    updateUserName,
    loginForm,
    loginSection,
    dashboardSection,
    loginButton,
  } from './domUpdates';

// //THIS IS WHERE YOUR CODE RUNS FROM

// Event listener for the login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission
  
    // Get the values of the username and password fields
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
  
    // Split the username to separate the 'traveler' part and the number part
    const usernameParts = username.split('traveler');
  
    // Check if there are two parts (i.e., 'traveler' + number)
    if (usernameParts.length === 2) {
      const travelerNumber = parseInt(usernameParts[1]);
  
      // Check if the number is greater than 0 and less than 51 and if the password is 'traveler'
      if (travelerNumber > 0 && travelerNumber < 51 && password === 'traveler') {
        // Successful login
  
        // Hide the login section and show the dashboard section
        loginSection.style.display = 'none';
        dashboardSection.style.display = 'block';
  
        // Fetch all the data and create the currentTraveler object
        fetchAllTheData().then(() => {
          const currentTravelerData = addDataToCurrentTraveler(
            travelerNumber, // Pass the login ID
            allTravelers, // Pass the variable directly
            allTrips, // Pass the variable directly
            allDestinations // Pass the variable directly
          );

          console.log(allDestinations)
  
   // Update the user name in the dashboard with the fetched currentTraveler's name
            updateUserName(currentTravelerData.traveler);

            const pendingTripImageURLs = getImageURLsOfPendingTrips(currentTravelerData);
            console.log(pendingTripImageURLs);

            //DOM with drop down
            updateDestinationDropdown(allDestinations)


                //DOM with pending trips
            updatePendingTrips(pendingTripImageURLs)

            const pastTripImageURLs = getImageURLsOfPastTrips(currentTravelerData);
                console.log(pastTripImageURLs);

            //  DOM with past trip images
            updatePastTrips(pastTripImageURLs);

                     // DOM with future trips
            const futureTripImageURLs = getImageURLsOfFutureTrips(currentTravelerData);
                        //DOM with future trip images
                        updateFutureTrips(futureTripImageURLs);

            //             //DOM with total amount spent 4 years
            const totalSpent = calculateTotalSpentOnTrips(currentTravelerData);
            console.log(totalSpent)
            updateTotalAmountSpent(totalSpent)

        

        });
      } else {
        // Invalid login, show an error message or alert
        alert('Invalid credentials. Please try again.');
      }
    } else {
      // Invalid username format, show an error message or alert
      alert('Invalid username format. Please use "traveler" followed by a number between 1 and 50.');
    }
  });
  


//    CALCULATING SINGLE TRIP COST
calculateCost.addEventListener('click', () => {
    // Get the values from your DOM elements
    const duration = parseInt(durationInput.value);
    const travelers = parseInt(travelersInput.value);
    const selectedDestinationIndex = parseInt(tripSelectionIndex.value);

    // Retrieve the selected destination data based on the index
    const selectedDestination = allDestinations[selectedDestinationIndex];


    // Calculate the trip cost using the imported function
    const totalCost = calculateTripCost(dateInput, duration, travelers, selectedDestination);

    console.log('Total Trip Cost:', totalCost);

    // Update the cost on the DOM
    updateCostOfSingleTrip(totalCost);
});








