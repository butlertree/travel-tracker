/////////////////// Global Variables /////////////////////
const travelersApi = "https://travel-tracker-api-tau.vercel.app/api/v1/travelers";  //all travelers
const tripsApi = "https://travel-tracker-api-tau.vercel.app/api/v1/trips"; //all trips
const destinationsApi = "https://travel-tracker-api-tau.vercel.app/api/v1/destinations"; //all destinations
let allTravelers = null;
let allTrips = null;
let allDestinations = null;


//FETCH CALLS

////////// FETCH TRAVELERS ////////////
const fetchTravelers = () => {
	return fetch(travelersApi)
		.then(response => {
			if (!response.ok) {
				throw Error(`Something is amiss. Request Code: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			allTravelers = data.travelers;
      return allTravelers;
		})
		.catch(error => {
			console.log(error);
		});
}

///////// FETCH TRIP DATA ////////////
const fetchTrips = () => {
	return fetch(tripsApi)
		.then(response => {
		if (!response.ok) {
			throw Error(`Something is amiss. Request Code: ${response.status}`);
		}
		return response.json();
	})
	.then(data => {
		allTrips = data.trips;
    return allTrips;
	})
	.catch(error => {
		console.log(error);
	});
}

////////// FETCH DESTINATIONS DATA ////////////
const fetchDestinations = () => {
	return fetch(destinationsApi)
		.then(response => {
		if (!response.ok) {
			throw Error(`Something is amiss. Request Code: ${response.status}`);
		}
		return response.json();
	})
	.then(data => {
		allDestinations = data.destinations;
    return allDestinations;
	})
	.catch(error => {
		console.log(error);
	});
}

/////////POST NEW TRIP//////////////
function postTripData(newTrip) {

    return fetch(tripsApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTrip)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Something went wrong: ${response.status} Error`);
        }
        return response.json();
    })
    .then(addedData => {
        
        return addedData; 
    })
    .catch(error => {
        alert(error.message);
        console.error(error);
    });
}




//////////// FETCH ALL THE DATA ////////////
const fetchAllTheData = () => {
	return Promise.all([
		fetchTravelers(travelersApi),
		fetchTrips(tripsApi),
		fetchDestinations(destinationsApi),
		
	])
}


//use this template to export
export {
    fetchAllTheData,
    allTravelers,
    allTrips,
    allDestinations,
    postTripData
  }
  