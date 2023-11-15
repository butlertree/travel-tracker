let currentTravelerData;

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// // An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

//////////// Import fetch call from apiCalls.js //////////////
import { 
    fetchAllTheData,
    allTravelers,
    allTrips,
    allDestinations,
    postTripData
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

///RUN///

/////// LOGIN/////////////
loginButton.addEventListener('click', (e) => {
    e.preventDefault(); 
  
    // USER NAME/PASSWORD
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
  
    
    const usernameParts = username.split('traveler');
  
    // TRAVELER + NUMBER
    if (usernameParts.length === 2) {
      const travelerNumber = parseInt(usernameParts[1]);
  
      
      if (travelerNumber > 0 && travelerNumber < 51 && password === 'traveler') {
        
  
        // HIDE LOGIN SHOW DASHBOARD
        loginSection.style.display = 'none';
        dashboardSection.style.display = 'block';
  
        // FETCH ALL DATA
        fetchAllTheData().then(() => {
          currentTravelerData = addDataToCurrentTraveler(
            travelerNumber, // Pass the login ID
            allTravelers, // Pass the variable directly
            allTrips, // Pass the variable directly
            allDestinations // Pass the variable directly
          );

  
              //USER NAME
            updateUserName(currentTravelerData.traveler);

            //PENDING TRIPS
            const pendingTripImageURLs = getImageURLsOfPendingTrips(currentTravelerData); 
            updatePendingTrips(pendingTripImageURLs)

            //PAST TRIPS
            const pastTripImageURLs = getImageURLsOfPastTrips(currentTravelerData);      
            updatePastTrips(pastTripImageURLs);

            //FUTURE TRIPS
            const futureTripImageURLs = getImageURLsOfFutureTrips(currentTravelerData);
            updateFutureTrips(futureTripImageURLs);


            //DROP DOWN
            updateDestinationDropdown(allDestinations)

            //TOTAL SPENT 4 YEARS
            const totalSpent = calculateTotalSpentOnTrips(currentTravelerData);
            
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
  


/// CALCULATING SINGLE TRIP COST///
calculateCost.addEventListener('click', () => {
 
  const duration = parseInt(durationInput.value);
  const travelers = parseInt(travelersInput.value);
  const selectedDestinationIndex = parseInt(tripSelectionIndex.value);

  // DESTINATION INDEX
  const selectedDestination = allDestinations[selectedDestinationIndex];

  // VALID INPUT
  if (isNaN(duration) || isNaN(travelers) || isNaN(selectedDestinationIndex)) {
    // Display an error message
    alert('Please fill in all the required fields with valid values.');
    return; 
  }

  // TRIP COST
  const totalCost = calculateTripCost(dateInput, duration, travelers, selectedDestination);

  

  // DOM UPDATE
  updateCostOfSingleTrip(totalCost);
});




/////ADDING PENDING TRIPS//////////////

submitTripButton.addEventListener('click', () => {
  
  const dateInputValue = dateInput.value; 
  const duration = parseInt(durationInput.value);
  const travelers = parseInt(travelersInput.value);
  const selectedDestinationIndex = parseInt(tripSelectionIndex.value);

  // IF VALID
  if (
    dateInputValue === '' ||
    isNaN(duration) ||
    isNaN(travelers) ||
    isNaN(selectedDestinationIndex)
  ) {
   
    alert('Please fill in all the required fields with valid values.');
    return; 
  }

  const tripDate = new Date(dateInputValue);

  const currentDate = new Date();

  if (tripDate <= currentDate) {
    alert('Trip date must be greater than the current date.');
    return;
  }

  // ALL TRIPS + 1
  const newTripId = allTrips.length + 1;

  // FORMATE DATE
  const date = new Date(dateInputValue);
  const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;

  // NEW TRIP OBJECT
  const newTrip = {
    id: newTripId, 
    userID: currentTravelerData.traveler.id, 
    destinationID: allDestinations[selectedDestinationIndex].id, 
    travelers: travelers,
    date: formattedDate,
    duration: duration,
    status: "pending", 
    suggestedActivities: []
  };

  // POST
  postTripData(newTrip)
    .then(() => {
      
      // GET UPDATED 
      fetchAllTheData()
        .then(() => {
          currentTravelerData = addDataToCurrentTraveler(
            currentTravelerData.traveler.id, 
            allTravelers, 
            allTrips, 
            allDestinations 
          );

          //UPDATE DOM
          const pendingTripImageURLs = getImageURLsOfPendingTrips(currentTravelerData);
          updatePendingTrips(pendingTripImageURLs);

        })
        .catch(error => {
       
          console.error('Fetch Data Error:', error);
        });
    })
    .catch(error => {
     
      console.error('POST Error:', error);
    });
});

















