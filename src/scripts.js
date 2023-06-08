// =========================================================
// ===============   variables and imports   ===============
// =========================================================

import './css/styles.css';
import { getAllData, postBooking, deleteBooking, findCustomer, getData } from './api-calls'
import { handleDropdown, updateNightsStayed, updateTotalSpent } from './dom-updates';

let customers;
let rooms;
let bookings;
let currentUser;


let dropdownLinks = document.querySelector(".user-dropdown");

// =========================================================
// ==================   event listeners   ==================
// =========================================================

window.addEventListener('load', () => {
  setData();
});

dropdownLinks.addEventListener('click', handleDropdown);

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