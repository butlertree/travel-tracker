const username = document.querySelector('#username')
const password = document.querySelector('#password')
const loginButton = document.querySelector('#submitLogin')
const travelerName = document.querySelector('#traveler')
const loginSection = document.querySelector('#login-section');
const dashboardSection = document.querySelector('#dashboard');
const pendingTripsContainer = document.querySelector('#pending-trips')
const pastTripsContainer = document.querySelector('#past-trips')
const futureTripsContainer = document.querySelector('#upcoming-trips')
const totalAmountSpent = document.querySelector('#total-amount')
const destinationDropdown = document.querySelector('#destination-dropdown');
const dateInput = document.querySelector('#start-date')
const durationInput = document.querySelector('#duration')
const travelersInput = document.querySelector('#travelers')
const calculateCost = document.querySelector('#cost-button')
const submitTripButton = document.querySelector('#submit-trip')
const tripSelectionIndex = document.querySelector('#destination-dropdown')
const viewTripCost = document.querySelector('#trip-cost')






////////DOM UPDATES TO HERE/////////


//TRAVELER NAME
const updateUserName = (traveler) => {
    travelerName.innerHTML ='';
    travelerName.innerHTML += `<h1>${traveler.name}</h1></p>`;
  }

  //TOTAL SPENT
  const updateTotalAmountSpent = (total) => {
    totalAmountSpent.innerHTML = '';
    totalAmountSpent.innerHTML += `<p>$${total}</p>`;
}

 //COST OF SINGLE TRIP
 const updateCostOfSingleTrip = (cost) => {
        viewTripCost.innerHTML = '';
        viewTripCost.innerHTML += `<p>$${cost.toFixed(2)}</p>`;
 }


////PENDING - PAST - FUTURE TRIP IMAGES TO DOM////
const updatePendingTrips = (pendingTripData) => {
    
    pendingTripsContainer.innerHTML = '';
  
    // CREATE ELEMENTS 
    pendingTripData.forEach((tripData) => {
      
      const imageUrl = tripData.image;
      const destinationName = tripData.destination;
  
      
      if (imageUrl && destinationName) {
        // CONTAINER
        const tripContainer = document.createElement('div');
  
        // THUMBNAIL IMAGE ELEMENT
        const tripThumbnail = document.createElement('img');
        tripThumbnail.src = imageUrl; // Set the image URL
        tripThumbnail.alt = `Thumbnail of ${destinationName}`; // Set alt text with destination name for better accessibility
        tripThumbnail.tabIndex = 0
  
        // PARAGRAPH FOR DESTINATION NAME
        const destinationParagraph = document.createElement('p');
        destinationParagraph.textContent = destinationName;
  
        // ADD TO TRIP CONTAINER
        tripContainer.appendChild(tripThumbnail);
        tripContainer.appendChild(destinationParagraph);
  
        // ADD TRIP TO CONTAINER
        pendingTripsContainer.appendChild(tripContainer);
      } else {
        console.error('Image URL or destination name is missing:', tripData);
      }
    });
  };
  
const updatePastTrips = (pastTripImageData) => {
    
    pastTripsContainer.innerHTML = '';
  
    //CREATE ELEMENTS
    pastTripImageData.forEach((tripData) => {
      
      const imageUrl = tripData.image;
      const destinationName = tripData.destination;
  
      
      if (imageUrl && destinationName) {
        // DIV CONTAINEER
        const tripContainer = document.createElement('div');
  
        // IMG ELEMENT
        const tripThumbnail = document.createElement('img');
        tripThumbnail.src = imageUrl; // Set the image URL
        tripThumbnail.alt = `Thumbnail of ${destinationName}`; // Set alt text with destination name for better accessibility
        tripThumbnail.tabIndex = 0

        // PARAGRAPH ELEMENT
        const destinationParagraph = document.createElement('p');
        destinationParagraph.textContent = destinationName;
  
        // ADD TO TRIP CONTAINER
        tripContainer.appendChild(tripThumbnail);
        tripContainer.appendChild(destinationParagraph);
  
        // ADD TRIP TO CONTAINER
        pastTripsContainer.appendChild(tripContainer);
      } else {
        console.error('Image URL or destination name is missing:', tripData);
      }
    });
  };
  
  

  // Function to update the DOM with future trip images that are not pending
  function updateFutureTrips(futureTripImageData) {
    
    futureTripsContainer.innerHTML = '';
  
    // CREATE ELEMENTS
    futureTripImageData.forEach((tripData) => {
      
      const imageUrl = tripData.image;
      const destinationName = tripData.destination;
  
      
      if (imageUrl && destinationName) {
        // DIV CONTAINER
        const tripContainer = document.createElement('div');
  
        // IMAGE ELEMENT
        const tripThumbnail = document.createElement('img');
        tripThumbnail.src = imageUrl; // Set the image URL
        tripThumbnail.alt = `Thumbnail of ${destinationName}`; // Set alt text with destination name for better accessibility
        tripThumbnail.tabIndex = 0
  
        // PARAGRAPH ELEMENT
        const destinationParagraph = document.createElement('p');
        destinationParagraph.textContent = destinationName;
  
        // ADD TO TRIP CONTAINER
        tripContainer.appendChild(tripThumbnail);
        tripContainer.appendChild(destinationParagraph);
  
        // ADD TRIP TO CONTAINER
        futureTripsContainer.appendChild(tripContainer);
      } else {
        console.error('Image URL or destination name is missing:', tripData);
      }
    });
  }




  
//////FUNCTON TO ADD ALL DESTINATIONS VIA DROPDOWN TO THE DASHBOARD
 
const updateDestinationDropdown = (destinationData) => {
    
    destinationDropdown.innerHTML = '';

    destinationData.forEach((destination, index) => {
        const option = document.createElement('option');
        option.value = index; // Set the value to the index for reference
        option.text = destination.destination; // Set the text to the destination name
        destinationDropdown.appendChild(option);
    });
};



///EXPORTS GO HERE LIKE THIS TEMPLATE
export {
   
    tripSelectionIndex,
    submitTripButton,
    calculateCost,
    travelersInput,
    durationInput,
    dateInput,
    username,
    password,
    loginButton,
    loginSection,
    dashboardSection,
    updateUserName,
    updatePendingTrips,
    updatePastTrips,
    updateFutureTrips,
    updateTotalAmountSpent,
    updateDestinationDropdown,
    updateCostOfSingleTrip
  }