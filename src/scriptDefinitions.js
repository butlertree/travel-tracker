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
 

  ///////////////PENDING trips to the DOM///////////////////

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
  
      // Create an array of objects with image URL and destination name
      const imageURLsAndDestinationsOfPendingTrips = matchingDestinations.map((destination) => ({
        image: destination.image,
        destination: destination.destination,
      }));
  
      return imageURLsAndDestinationsOfPendingTrips;
    } else {
      // If currentTravelerData is not valid or has no trips, return an empty array
      return [];
    }
  }
  
  
 ///////////////PAST trips to the DOM///////////////////
function getImageURLsOfPastTrips(currentTravelerData) {
    // Check if currentTravelerData is valid and has trips
    if (currentTravelerData && currentTravelerData.trips) {
      // Filter trips to get only past trips that are not pending
      const pastTrips = currentTravelerData.trips.filter((trip) => {
        return trip.status !== 'pending' && new Date(trip.date) < new Date(); // Check if the trip is in the past
      });
  
      // Map past trips to image URLs and destinations
      const imageURLsAndDestinationsOfPastTrips = pastTrips.map((trip) => {
        const matchingDestination = currentTravelerData.destinations.find(
          (destination) => destination.id === trip.destinationID
        );
  
        if (matchingDestination) {
          return {
            image: matchingDestination.image,
            destination: matchingDestination.destination,
          };
        }

        return {
          message: 'No matching destination found',
        };
      });
  
      return imageURLsAndDestinationsOfPastTrips;
    } else {
      // If currentTravelerData is not valid or has no trips, return an empty array
      return [];
    }
  }
  

//  ///////////////FUTURE trips to the DOM///////////////////
 
function getImageURLsOfFutureTrips(currentTravelerData) {
    // Check if currentTravelerData is valid and has trips
    if (currentTravelerData && currentTravelerData.trips) {
      // Filter trips to get only future trips that are not pending
      const futureTrips = currentTravelerData.trips.filter((trip) => {
        return trip.status !== 'pending' && new Date(trip.date) > new Date(); // Check if the trip is in the future
      });
  
      // Map future trips to image URLs and destinations
      const imageURLsAndDestinationsOfFutureTrips = futureTrips.map((trip) => {
        const matchingDestination = currentTravelerData.destinations.find(
          (destination) => destination.id === trip.destinationID
        );
  
        if (matchingDestination) {
          return {
            image: matchingDestination.image,
            destination: matchingDestination.destination,
          };
        }

        return {
          message: 'No matching destination found',
        };
      });
      
      return imageURLsAndDestinationsOfFutureTrips;
    } else {
      // If currentTravelerData is not valid or has no trips, return an empty array
      return [];
    }
  }
  
  /////////CALCULATE TOTAL COST FOR THE YEAR////////////////

	function calculateTotalSpentOnTrips(currentTravelerData) {
		// Get the current date
		const currentDate = new Date();
	
		// Calculate the date 4 years ago from the current date
		const threeYearsAgo = new Date(currentDate);
		threeYearsAgo.setFullYear(currentDate.getFullYear() - 4);
	
		// Filter trips for the past 3 years and with 'approved' status
		const recentTrips = currentTravelerData.trips.filter((trip) => {
			const tripDate = new Date(trip.date);
			return tripDate >= threeYearsAgo && tripDate <= currentDate && trip.status === 'approved';
		});
	
		console.log('Recent Trips:', recentTrips);
	
		// Calculate the total cost spent on trips
		const totalCost = recentTrips.reduce((sum, trip) => {
			const destination = currentTravelerData.destinations.find((dest) => dest.id === trip.destinationID);
	
			if (destination) {
				const flightCost = trip.travelers * destination.estimatedFlightCostPerPerson;
				const lodgingCost = trip.duration * destination.estimatedLodgingCostPerDay;
				const tripTotalCost = flightCost + lodgingCost;
	
				console.log('Trip:', trip);
				console.log('Flight Cost:', flightCost);
				console.log('Lodging Cost:', lodgingCost);
				console.log('Trip Total Cost:', tripTotalCost);
	
				return sum + tripTotalCost;
			}
	
			return sum;
		}, 0);
	
		console.log('Total Cost:', totalCost);
	
		// Include the travel agent fee (10%)
		const totalSpentWithFee = totalCost * 1.1;
	
		return totalSpentWithFee;
	}
	
	

	


 

// EXPORT EVERYTHING LIKE THIS
module.exports = {
    addDataToCurrentTraveler,
    getImageURLsOfPendingTrips,
    getImageURLsOfPastTrips,
    getImageURLsOfFutureTrips,
		calculateTotalSpentOnTrips
    
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