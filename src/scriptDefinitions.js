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
 




 

// EXPORT EVERYTHING LIKE THIS
module.exports = {
    addDataToCurrentTraveler
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