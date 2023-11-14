import { expect } from 'chai';

//FUNCTIONS FROM THE SCRIPT DEFINITIONS FILE
const { 
    addDataToCurrentTraveler,
    getImageURLsOfPendingTrips,
    getImageURLsOfPastTrips,
    getImageURLsOfFutureTrips,
	  calculateTotalSpentOnTrips,
	  calculateTripCost
    } = require('../src/scriptDefinitions');

//ACCESS TO THE TEST DATA
const { 
    travelers,
    trips,
    destinations
    } = require('../src/data/testData');


/////////TESTS TO CREATE THE TRAVELER/////////
    describe('addDataToCurrentTraveler', function () {
      it('should return null if travelerNumber is not found in travelersData', function () {
        const result = addDataToCurrentTraveler(999, travelers, trips, destinations);
        expect(result).to.be.null;
      });
    
      it('should return the complete current traveler object when travelerNumber is found', function () {
        const travelerNumber = 1; 
        const result = addDataToCurrentTraveler(travelerNumber, travelers, trips, destinations);
    
        const expectedTraveler = travelers.find((traveler) => traveler.id === travelerNumber);
    
        const expectedTrips = trips.filter((trip) => trip.userID === travelerNumber);
    
        const expectedDestinations = expectedTrips.map((trip) =>
          destinations.find((destination) => destination.id === trip.destinationID)
        );
    
        const expected = {
          traveler: expectedTraveler,
          trips: expectedTrips,
          destinations: expectedDestinations,
        };
    
        expect(result).to.deep.equal(expected);
      });
    });

///////////TESTS FOR PAST TRIPS///////////////

describe('getImageURLsOfPastTrips', function () {
  it('should return an array of image URLs and destinations for past trips when currentTravelerData is valid with past trips', function () {

    const travelerNumber = 1;
    const currentTravelerData = addDataToCurrentTraveler(travelerNumber, travelers, trips, destinations);

    const result = getImageURLsOfPastTrips(currentTravelerData);

  
    expect(result).to.be.an('array');

    
    const expected = [
      {
        image: "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
        destination: "Lima, Peru"
      },
      {
        image: "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        destination: "Stockholm, Sweden"
      },
    ];

    expect(result).to.deep.equal(expected);
  });

  it('should return an empty array when currentTravelerData has no past trips', function () {
    // no past trips 
    const travelerNumber = 2;
    const currentTravelerData = addDataToCurrentTraveler(travelerNumber, travelers, trips, destinations);

    const result = getImageURLsOfPastTrips(currentTravelerData);

    // empty array
    expect(result).to.be.an('array').that.is.empty;
  });

  it('should return an empty array when currentTravelerData is not valid or has no trips', function () {
   
    const currentTravelerData = null; 
    
    const result = getImageURLsOfPastTrips(currentTravelerData);

    // empty array
    expect(result).to.be.an('array').that.is.empty;
  });
});


//////PENDING TRIPS////////////////

describe('getImageURLsOfPendingTrips', function () {
  it('should return an array of image URLs and destinations for pending trips when currentTravelerData is valid with pending trips', function () {

    const travelerNumber = 3;
    const currentTravelerData = addDataToCurrentTraveler(travelerNumber, travelers, trips, destinations);

    const result = getImageURLsOfPendingTrips(currentTravelerData);

    // an array
    expect(result).to.be.an('array');

   
   
    const expected = [
      {
        image:  "https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
        destination: "Paris, France"
      },
    ];

    expect(result).to.deep.equal(expected);
  });

  it('should return an empty array when currentTravelerData has no pending trips', function () {
    
    const travelerNumber = 2;
    const currentTravelerData = addDataToCurrentTraveler(travelerNumber, travelers, trips, destinations);

    const result = getImageURLsOfPendingTrips(currentTravelerData);

    // empty array
    expect(result).to.be.an('array').that.is.empty;
  });

  it('should return an empty array when currentTravelerData is not valid or has no trips', function () {
    
    const currentTravelerData = null; 

    const result = getImageURLsOfPendingTrips(currentTravelerData);

    // empty array
    expect(result).to.be.an('array').that.is.empty;
  });
});



/////////FUTURE TRIPS////////////////////////

describe('getImageURLsOfFutureTrips', function () {
  it('should return an array of image URLs and destinations for future trips when currentTravelerData is valid with future trips', function () {
  
    const travelerNumber = 4;
    const currentTravelerData = addDataToCurrentTraveler(travelerNumber, travelers, trips, destinations);

    const result = getImageURLsOfFutureTrips(currentTravelerData);

    //  an array
    expect(result).to.be.an('array');

    
    const expected = [
      {
        image: "https://images.unsplash.com/photo-1517821362941-f7f753200fef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80",
        destination: "Marrakesh, Morocco"
      },
    ];

    expect(result).to.deep.equal(expected);
  });

  it('should return an empty array when currentTravelerData has no future trips', function () {
    
    const travelerNumber = 5;
    const currentTravelerData = addDataToCurrentTraveler(travelerNumber, travelers, trips, destinations);

    const result = getImageURLsOfFutureTrips(currentTravelerData);

    // empty array
    expect(result).to.be.an('array').that.is.empty;
  });

  it('should return an empty array when currentTravelerData is not valid or has no trips', function () {

    const currentTravelerData = null; 

    const result = getImageURLsOfFutureTrips(currentTravelerData);

    // empty array
    expect(result).to.be.an('array').that.is.empty;
  });
});



/////CALCULATION TOTAL SPENT ON TRIPS///////////////

describe('calculateTotalSpentOnTrips', function () {
  it('should calculate the total amount spent on approved trips in the past 3 years with travel agent fee included', function () {
    const currentTravelerData = addDataToCurrentTraveler(1, travelers, trips, destinations);
     
    const result = calculateTotalSpentOnTrips(currentTravelerData);

    //  floating-point number "a string"
    const resultFloat = parseFloat(result);

    // parsed = expected number
    const expected = 7370.00;

    expect(resultFloat).to.equal(expected);
  });

  it('should return 0 when there are no approved trips in the past 3 years', function () {
    const currentTravelerData = addDataToCurrentTraveler(6, travelers, trips, destinations);
    const result = calculateTotalSpentOnTrips(currentTravelerData);

    // floating-point 
    const resultFloat = parseFloat(result);

    const expected = 0.00;

    expect(resultFloat).to.equal(expected);
  });
});



////CALCULATE SINGLE TRIP COST/////////////
describe('calculateTripCost', function () {
  it('should calculate the cost of a trip with valid inputs', function () {
    const date = '2023/05/15';
    const duration = 7;
    const travelers = 2;

    const selectedDestination = destinations[0]; 
    const result = calculateTripCost(date, duration, travelers, selectedDestination);

    // Calculate expected cost 
    const lodgingCost = duration * selectedDestination.estimatedLodgingCostPerDay;
    const flightCost = travelers * selectedDestination.estimatedFlightCostPerPerson;
    const agentFee = 0.1; // 10% agent fee
    const expected = (lodgingCost + flightCost) * (1 + agentFee);

    expect(result).to.equal(expected);
  });

  it('should return null for invalid inputs', function () {
    // Invalid inputs
    const date = '2023/05/15';
    const duration = null;
    const travelers = 2;

    const selectedDestination = destinations[0]; 
    const result = calculateTripCost(date, duration, travelers, selectedDestination);

    expect(result).to.equal(null);
  });
});
