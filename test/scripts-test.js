import { expect } from 'chai';

//FUNCTIONS FROM THE SCRIPT DEFINITIONS FILE
const { generateRandomUserID, findUserByEmail, addDataToCurrentUser, findStepGoalAverage, getHydrationFor7Days, calculateTotalHydration, findDistanceTraveled, ouncesPerDay, calculateAverageHoursSlept, calculateAverageSleepQuality, hoursSleptGivenDate, sleepQualityGivenDate, getSleepFor7Days, getSleepQualityFor7Days, checkStepGoal, minutesActiveGivenDate, checkStepGoal7Days, numberOfStepsGivenDate, findBottomDrinkers, findBottomSleepers, findBottomStepTakers } = require('../src/scriptDefinitions');

//ACCESS TO THE TEST DATA
const { users, hydrationData, activityData, sleepData } = require('../src/data/testData');