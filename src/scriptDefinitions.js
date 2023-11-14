


  // MAKE THE TRAVELER
  function addDataToCurrentTraveler(travelerNumber, travelersData, tripsData, tripDestinations) {
    // Find traveler
    const currentTraveler = travelersData.find((traveler) => traveler.id === travelerNumber);

    if (currentTraveler) {
      // Filter to find trips
      const currentTravelerTrips = tripsData.filter((trip) => trip.userID === travelerNumber);

      // Add destinations to traveler 
      const destinations = currentTravelerTrips.map((trip) => {
        
        const destination = tripDestinations.find((dest) => dest.id === trip.destinationID);
        return destination;
      });

      // CompleteCurrentTraveler object
      const completeCurrentTraveler = {
        traveler: currentTraveler,
        trips: currentTravelerTrips,
        destinations: destinations,
      };

      
      return completeCurrentTraveler;
    } else {
      //If no traveler
      return null;
    }
  }
 

  ///////////////PENDING trips to the DOM///////////////////
function getImageURLsOfPendingTrips(currentTravelerData) {
    // If valid
    if (currentTravelerData && currentTravelerData.trips) {
      //Find pending
      const pendingTrips = currentTravelerData.trips.filter((trip) => trip.status === 'pending');
  
      const pendingDestinationIDs = pendingTrips.map((trip) => trip.destinationID);

      const matchingDestinations = currentTravelerData.destinations.filter((destination) =>
        pendingDestinationIDs.includes(destination.id)
      );
  
      // Objects with image URL and destination name
      const imageURLsAndDestinationsOfPendingTrips = matchingDestinations.map((destination) => ({
        image: destination.image,
        destination: destination.destination,
      }));
  
      return imageURLsAndDestinationsOfPendingTrips;
    } else {

      return [];
    }
  }
  
  
 ///////////////PAST trips to the DOM///////////////////
function getImageURLsOfPastTrips(currentTravelerData) {
    // If valid
    if (currentTravelerData && currentTravelerData.trips) {
      // Get past trips that are not pending
      const pastTrips = currentTravelerData.trips.filter((trip) => {
        return trip.status !== 'pending' && new Date(trip.date) < new Date(); 
      });
  
      // // Objects with image URL and destination name
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
      
      return [];
    }
  }
  

//  ///////////////FUTURE trips to the DOM///////////////////
 
function getImageURLsOfFutureTrips(currentTravelerData) {
    // If valid
    if (currentTravelerData && currentTravelerData.trips) {
      // Get future trips that are not pending
      const futureTrips = currentTravelerData.trips.filter((trip) => {
        return trip.status !== 'pending' && new Date(trip.date) > new Date(); 
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
	
		// Filter trips for the past 4 years and with status approved
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
	
		// agent fee (10%)
		const totalSpentWithFee = totalCost * 1.1;
	
		return totalSpentWithFee.toFixed(2);
	}
	
	



// CALCULATE SINGLE TRIP COST

function calculateTripCost(date, duration, travelers, selectedDestination) {
  // If duration or travelers is missing
  if (duration === null || travelers === null || duration === undefined || travelers === undefined) {
    return null;
  }

  const lodgingCost = duration * selectedDestination.estimatedLodgingCostPerDay;
  const flightCost = travelers * selectedDestination.estimatedFlightCostPerPerson;
  const agentFee = 0.1; // 10% agent fee
  const totalCost = (lodgingCost + flightCost) * (1 + agentFee);
  return totalCost;
}



// EXPORT EVERYTHING LIKE THIS
module.exports = {
    addDataToCurrentTraveler,
    getImageURLsOfPendingTrips,
    getImageURLsOfPastTrips,
    getImageURLsOfFutureTrips,
		calculateTotalSpentOnTrips,
		calculateTripCost
    
  };

