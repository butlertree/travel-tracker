// JS FUNCTIONS GO HERE


  // Function to get user data and trips
  function addDataToCurrentTraveler(travelerNumber, travelersData, tripsData, tripDestinations) {
    // Find the traveler in travelersData whose id matches travelerNumber
    const currentTraveler = travelersData.find((traveler) => traveler.id === travelerNumber);

    // Check if the traveler was found
    if (currentTraveler) {
      // Filter the trips in tripsData to find trips belonging to the current traveler
      const currentTravelerTrips = tripsData.filter((trip) => trip.userID === travelerNumber);

      // Add destinations to the traveler based on matching destinationID
      const destinations = currentTravelerTrips.map((trip) => {
        // Find the destination in tripDestinations whose id matches the trip's destinationID
        const destination = tripDestinations.find((dest) => dest.id === trip.destinationID);
        return destination;
      });

      // Create a completeCurrentTraveler object containing traveler, trips, and destinations
      const completeCurrentTraveler = {
        traveler: currentTraveler,
        trips: currentTravelerTrips,
        destinations: destinations,
      };

      // Return the completeCurrentTraveler object
      return completeCurrentTraveler;
    } else {
      // If the traveler was not found, return null
      return null;
    }
  }
 

  ///////////////image urls///////////////////


// Function to get image URLs of pending trips
function getImageURLsOfPendingTrips(currentTravelerData) {
    // Check if currentTravelerData is valid and has trips
    if (currentTravelerData && currentTravelerData.trips) {
      // Filter trips to get only pending trips
      const pendingTrips = currentTravelerData.trips.filter((trip) => trip.status === 'pending');
  
      // Get destination IDs of pending trips
      const pendingDestinationIDs = pendingTrips.map((trip) => trip.destinationID);
  
      // Filter destinations to get only those matching pending destination IDs
      const matchingDestinations = currentTravelerData.destinations.filter((destination) =>
        pendingDestinationIDs.includes(destination.id)
      );
  
      // Get image URLs from the matching destinations
      const imageURLsOfPendingTrips = matchingDestinations.map((destination) => destination.image);
  
      return imageURLsOfPendingTrips;
    } else {
      // If currentTravelerData is not valid or has no trips, return an empty array
      return [];
    }
  }
  
  
//   const pendingTripImageURLs = getImageURLsOfPendingTrips(currentTravelerData);
//   console.log(pendingTripImageURLs);



 

// EXPORT EVERYTHING LIKE THIS
module.exports = {
    addDataToCurrentTraveler,
    getImageURLsOfPendingTrips
  };


 
//   // Function to show the login and hide the dashboard
//   function showLogin() {
//     loginSection.style.display = 'block';
//     dashboardSection.style.display = 'none';
//   }

//   // Function to log out and show the login section
// function logout() {
//     // Perform any logout logic (e.g., clearing user session)
//     // Then, show the login section and hide the dashboard
//     showLogin();
//   }
  
//   // Event listener for a "Log Out" button
//   logoutButton.addEventListener('click', () => {
//     // Call the logout function when the button is clicked
//     logout();
//   });