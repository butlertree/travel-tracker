//query selectors go here

const username = document.querySelector('#username')
const password = document.querySelector('#password')
const loginButton = document.querySelector('#submitLogin')
const loginForm = document.querySelector('#login-form');
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






///DOM UPDATES TO HERE


//add user name to the dom 
const updateUserName = (traveler) => {
    travelerName.innerHTML ='';
    travelerName.innerHTML += `<h1>${traveler.name}</h1></p>`;
  }

  //add amount total amount spent to dom
  const updateTotalAmountSpent = (total) => {
    totalAmountSpent.innerHTML = '';
    totalAmountSpent.innerHTML += `<p>$${total.toFixed(2)}</p>`;
}

 //add cost for a single trip
 const updateCostOfSingleTrip = (cost) => {
        viewTripCost.innerHTML = '';
        viewTripCost.innerHTML += `<p>$${cost.toFixed(2)}</p>`;
 }




//adding trip image and destination to the dom
const updatePendingTrips = (pendingTripData) => {
    // Clear the existing content in the container
    pendingTripsContainer.innerHTML = '';
  
    // Loop through the pendingTripData and create elements for images and destination names
    pendingTripData.forEach((tripData) => {
      // Correctly destructure the properties based on your data structure
      const { image: imageUrl, destination: destinationName } = tripData;
  
      // Check if imageUrl and destinationName are defined
      if (imageUrl && destinationName) {
        // Create a container div for each pending trip
        const tripContainer = document.createElement('div');
  
        // Create an image element for the thumbnail
        const tripThumbnail = document.createElement('img');
        tripThumbnail.src = imageUrl; // Set the image URL
        tripThumbnail.alt = `Thumbnail of ${destinationName}`; // Set alt text with destination name for better accessibility
        tripThumbnail.tabIndex = 0
  
        // Create a paragraph element for the destination name
        const destinationParagraph = document.createElement('p');
        destinationParagraph.textContent = destinationName;
  
        // Append the thumbnail and destination name to the trip container
        tripContainer.appendChild(tripThumbnail);
        tripContainer.appendChild(destinationParagraph);
  
        // Append the trip container to the container
        pendingTripsContainer.appendChild(tripContainer);
      } else {
        console.error('Image URL or destination name is missing:', tripData);
      }
    });
  };
  
const updatePastTrips = (pastTripImageData) => {
    // Clear the existing content in the container
    pastTripsContainer.innerHTML = '';
  
    // Loop through the pastTripImageData and create elements for images and destination names
    pastTripImageData.forEach((tripData) => {
      // Correctly destructure the properties based on your data structure
      const { image: imageUrl, destination: destinationName } = tripData;
  
      // Check if imageUrl and destinationName are defined
      if (imageUrl && destinationName) {
        // Create a container div for each past trip
        const tripContainer = document.createElement('div');
  
        // Create an image element for the thumbnail
        const tripThumbnail = document.createElement('img');
        tripThumbnail.src = imageUrl; // Set the image URL
        tripThumbnail.alt = `Thumbnail of ${destinationName}`; // Set alt text with destination name for better accessibility
        tripThumbnail.tabIndex = 0

        // Create a paragraph element for the destination name
        const destinationParagraph = document.createElement('p');
        destinationParagraph.textContent = destinationName;
  
        // Append the thumbnail and destination name to the trip container
        tripContainer.appendChild(tripThumbnail);
        tripContainer.appendChild(destinationParagraph);
  
        // Append the trip container to the container
        pastTripsContainer.appendChild(tripContainer);
      } else {
        console.error('Image URL or destination name is missing:', tripData);
      }
    });
  };
  
  

  // Function to update the DOM with future trip images that are not pending
  function updateFutureTrips(futureTripImageData) {
    // Clear the existing content in the container
    futureTripsContainer.innerHTML = '';
  
    // Loop through the futureTripImageData and create elements for images and destination names
    futureTripImageData.forEach((tripData) => {
      // Correctly destructure the properties based on your data structure
      const { image: imageUrl, destination: destinationName } = tripData;
  
      // Check if imageUrl and destinationName are defined
      if (imageUrl && destinationName) {
        // Create a container div for each future trip
        const tripContainer = document.createElement('div');
  
        // Create an image element for the thumbnail
        const tripThumbnail = document.createElement('img');
        tripThumbnail.src = imageUrl; // Set the image URL
        tripThumbnail.alt = `Thumbnail of ${destinationName}`; // Set alt text with destination name for better accessibility
        tripThumbnail.tabIndex = 0
  
        // Create a paragraph element for the destination name
        const destinationParagraph = document.createElement('p');
        destinationParagraph.textContent = destinationName;
  
        // Append the thumbnail and destination name to the trip container
        tripContainer.appendChild(tripThumbnail);
        tripContainer.appendChild(destinationParagraph);
  
        // Append the trip container to the container
        futureTripsContainer.appendChild(tripContainer);
      } else {
        console.error('Image URL or destination name is missing:', tripData);
      }
    });
  }




  
//////FUNCTON TO ADD ALL DESTINATIONS VIA DROPDOWN TO THE DASHBOARD
 
const updateDestinationDropdown = (destinationData) => {
    // Clear any existing options
    destinationDropdown.innerHTML = '';

    // Loop through destinationData and create options for the dropdown
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
    // loginForm,
    updateUserName,
    updatePendingTrips,
    updatePastTrips,
    updateFutureTrips,
    updateTotalAmountSpent,
    updateDestinationDropdown,
    updateCostOfSingleTrip
  }