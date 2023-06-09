// =========================================================
// ===============   variables and imports   ===============
// =========================================================

import './css/styles.css';
import './images/turing-logo.png'
import { getAllData, postBooking, deleteBooking, findCustomer, getData } from './api-calls'
import { handleDropdown, updateNightsStayed, updateTotalSpent, populateBookings, populateUserProfile, populateUserWelcome, populateAvailableRooms, setCalendarDates } from './dom-updates';
import { getUserBookings, getTodaysDate, filterOutUnavailableRooms, filterAvailableRoomsByType } from './booking-utils';


let customers;
let rooms;
let bookings;
let currentUser;
let userBookings;
const todaysDate = getTodaysDate();

const pastTrips = document.querySelector('#past-trips');
const futureTrips = document.querySelector('#upcoming-trips')
const dropdownLinks = document.querySelector('.user-profile');
const formData = document.querySelector('#booking-options');
const pickedDate = document.querySelector('#pick-day');
const roomType = document.querySelector('#room-types');

// =========================================================
// ==================   event listeners   ==================
// =========================================================

window.addEventListener('load', () => {
  setData();
  setCalendarDates();
});

dropdownLinks.addEventListener('click', handleDropdown);

pastTrips.addEventListener('click', () => {
  userBookings = getUserBookings(todaysDate, currentUser.id, bookings, 'past');
  populateBookings(userBookings, rooms);
});

futureTrips.addEventListener('click', () => {
  userBookings = getUserBookings(todaysDate, currentUser.id, bookings, 'upcoming');
  populateBookings(userBookings, rooms);
});

formData.addEventListener('submit', (e) => {
  e.preventDefault();
  const selectedDate = new Date(`${pickedDate.value}T00:00`).toLocaleDateString("en-CA");
  const selectedRoomType = roomType.value;
  const availableRooms = filterOutUnavailableRooms(selectedDate, bookings, rooms)
  const filteredRooms = filterAvailableRoomsByType(availableRooms, selectedRoomType);
  populateAvailableRooms(filteredRooms);
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
      
      updateNightsStayed();
      updateTotalSpent();
      populateUserProfile(currentUser.name);
      populateUserWelcome(currentUser.name);
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
