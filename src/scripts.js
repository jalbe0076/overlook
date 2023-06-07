// =========================================================
// ===============   variables and imports   ===============
// =========================================================

import './css/styles.css';
import { getAllData, postBooking, deleteBooking } from './api-calls';
import { findCustomer } from "./api-calls";

let customers;
let rooms;
let bookings;

// =========================================================
// ==================   event listeners   ==================
// =========================================================

window.addEventListener('load', () => {
  setData();
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
    });
};

const getCustomer = (userId) => {
  return findCustomer(userId);
};

export {
  setData
};