/////////////////// Global Variables /////////////////////
const travelersApi = "http://localhost:3001/api/v1/travelers";  //all travelers
const tripsApi = "http://localhost:3001/api/v1/trips"; //all trips
const destinationsApi = "http://localhost:3001/api/v1/destinations"; //all destinations
let allTravelers = null;
let allTrips = null;
let allDestinations = null;


//Do fetch calls here

////////// FETCH TRAVELSER ////////////
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

///////// FETCH HYDRATION DATA ////////////
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

////////// FETCH ACTIVITY DATA ////////////
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
    allDestinations
//  postHydrationData
  }
  