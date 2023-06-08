// =========================================================
// ===============   variables and imports   ===============
// =========================================================

import './css/styles.css';
import { getAllData, postBooking, deleteBooking } from './api-calls'
import { findCustomer } from "./api-calls";
import { handleDropdown } from './dom-updates';

let customers;
let rooms;
let bookings;

let userOptions = document.querySelectorAll('.dropdown-menu > li a')

// =========================================================
// ==================   event listeners   ==================
// =========================================================

window.addEventListener('load', () => {
  setData();
});

let dropdownLinks = document.querySelector(".user-dropdown");
dropdownLinks.addEventListener('click', handleDropdown);

userOptions.forEach(link => {
  link.addEventListener('keyup', () => {
   
  })
});



// for (let i = 0; i < dropdownLinks.length; i++) {

//   dropdownLinks[i].addEventLister('click', (e) => {
//     console.log('click')
//     handleDropdown(e)});

// }

// =========================================================
// =====================   functions   =====================
// =========================================================

const setData = () => {
  getAllData()
    .then(resolve => {
      customers = resolve[0].customers;
      rooms = resolve[1].rooms;
      bookings = resolve[2].bookings;
    });
};

const getCustomer = (userId) => {
  return findCustomer(userId);
};

export {
  setData
};