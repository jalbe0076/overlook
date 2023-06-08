// =========================================================
// ===============   variables and imports   ===============
// =========================================================

import './css/styles.css';
import './images/turing-logo.png'
import { getAllData, postBooking, deleteBooking, findCustomer, getData } from './api-calls'
import { handleDropdown, updateNightsStayed, updateTotalSpent, populateBookings } from './dom-updates';
import { getUserPastBookings, getTodaysDate } from './booking-utils';

let customers;
let rooms;
let bookings;
let currentUser;
let userBookings;
let todaysDate;

const pastTrips = document.querySelector('#past-trips');
const futureTrips = document.querySelector('#upcoming-trips')
const dropdownLinks = document.querySelector('.user-dropdown');

// =========================================================
// ==================   event listeners   ==================
// =========================================================

window.addEventListener('load', () => {
  setData();
  todaysDate = getTodaysDate();
});

dropdownLinks.addEventListener('click', handleDropdown);

pastTrips.addEventListener('click', () => {
  userBookings = getUserPastBookings(currentUser.id, bookings);
  populateBookings(todaysDate, userBookings, rooms, 'past');
});

futureTrips.addEventListener('click', () => {
  userBookings = getUserPastBookings(currentUser.id, bookings);
  populateBookings(todaysDate, userBookings, rooms, 'future');
});

// =========================================================
// =====================   functions   =====================
// =========================================================

const setData = () => {
  getAllData()
    .then(resolve => {
      customers = resolve[0].customers;
      rooms = resolve[1].rooms;
      bookings = resolve[2].bookings;
      currentUser = getCustomer(50);
      updateNightsStayed()
      updateTotalSpent()
    });
};

const getCustomer = (userId) => {
  return customers.find(customer => customer.id === userId);
  // return findCustomer(userId);
};

export {
  bookings,
  setData,
  currentUser,
  rooms
};