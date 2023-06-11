// =========================================================
// ===============   variables and imports   ===============
// =========================================================

import './css/styles.css';
import './images/single-room.jpg';
import './images/double-room.jpg';
import './images/single-junior-suite.jpg';
import './images/double-junior-suite.jpg';
import './images/single-suite.jpg';
import './images/double-suite.jpg';
import './images/single-residential-suite.jpg';
import './images/double-residential-suite.jpg';
import './images/customer-rating.png';
import './images/booking-page.jpg'
import { getAllData, postBooking, deleteBooking, findCustomer, getData } from './api-calls'
import { handleDropdown, updateNightsStayed, updateTotalSpent, populateBookings, populateUserProfile, populateUserWelcome, populateAvailableRooms, setCalendarDates, showRoomModal, modalBookingBtn, displayTripMessage, resetTripMessage, updateCustomerStatus, handleActiveBtn, addHidden, removeHidden, removeBookings } from './dom-updates';
import { getUserBookings, getTodaysDate, filterOutUnavailableRooms, filterAvailableRoomsByType, findRoom, checkPassword, checkUsername } from './booking-utils';

let customers;
let rooms;
let bookings;
let currentUser;
let userBookings;
let selectedDate;
const todaysDate = getTodaysDate();
const pastTrips = document.querySelector('#past-trips');
const futureTrips = document.querySelector('#upcoming-trips')
const dropdownLinks = document.querySelector('.user-profile');
const formData = document.querySelector('#booking-options');
const pickedDate = document.querySelector('#pick-day');
const roomType = document.querySelector('#room-types');
const navBtns = document.querySelectorAll('.nav-tab');
const displayRoomsBtn = document.querySelector('.see-available-rooms');
const displayRooms = document.querySelector('.available-rooms');
const welcomeMessage = document.querySelector('.welcome-message');
const coverImg = document.querySelector('.cover');
const banner = document.querySelector('.banner');
const loginBtn = document.querySelector('.login-btn');
const userPassword = document.querySelector('#password');
const username = document.querySelector('#username');
const loginPage = document.querySelector('.modal-login');
const falseValidation = document.querySelector('.false-validation')

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
  resetTripMessage(userBookings);
  
  if (typeof userBookings === 'object') {
    populateBookings(userBookings, rooms);
    addHidden(welcomeMessage);
    addHidden(coverImg);
    banner.style.background = '#ffffff';
  } else {
    removeBookings();
    banner.style.background = none;
  }
});

futureTrips.addEventListener('click', () => {
  userBookings = getUserBookings(todaysDate, currentUser.id, bookings, 'upcoming');
  resetTripMessage(userBookings);
  console.log(resetTripMessage(userBookings))
  console.log(typeof userBookings)
  if (typeof userBookings === 'object') {
    populateBookings(userBookings, rooms);
    addHidden(welcomeMessage);
    addHidden(coverImg);
    banner.style.background = '#ffffff';
  } else {
    removeBookings(userBookings);
    removeHidden(welcomeMessage);
    removeHidden(coverImg);
    banner.style.background = 'none';
  }
});

formData.addEventListener('submit', (e) => {
  e.preventDefault();
  resetTripMessage();
  selectedDate = new Date(`${pickedDate.value}T00:00`).toLocaleDateString("en-CA");
  const selectedRoomType = roomType.value;
  const availableRooms = filterOutUnavailableRooms(selectedDate, bookings, rooms)
  const filteredRooms = filterAvailableRoomsByType(availableRooms, selectedRoomType, selectedDate);
  
  if(typeof filteredRooms === 'string') {
    removeHidden(welcomeMessage);
    removeHidden(coverImg);
    removeBookings();
    displayTripMessage(filteredRooms);
    banner.style.background = 'none';
  } else {
    addHidden(welcomeMessage);
    addHidden(coverImg);
    populateAvailableRooms(filteredRooms);
    banner.style.background = '#ffffff';
  }
  
  let roomsToBook = document.querySelectorAll('.rooms');
  roomsToBook.forEach((room) => {
    room.addEventListener('keyup', (e) => {
        if (e.keyCode === 13 || e.keyCode === 32) {
          const selectedRoom = findRoom(room.id, rooms);
          showRoomModal(selectedRoom, selectedDate);
        }
      });

    room.addEventListener('click', () => {
      const selectedRoom = findRoom(room.id, rooms);
      showRoomModal(selectedRoom, selectedDate);
    });
  });
});

navBtns.forEach(button => {
  button.addEventListener('click', () => {
    handleActiveBtn();
    button.classList.add('nav-tab-active');
    button.style.color =  '#212427';
    
    if (button.id === 'bookings') {
      removeHidden(displayRoomsBtn);
      removeHidden(roomType);
      removeHidden(pickedDate);
      displayRooms.innerHTML = '';
      resetTripMessage();
      removeBookings(userBookings);
      removeHidden(welcomeMessage);
      removeHidden(coverImg);
      banner.style.background = 'none';
    } else {
      addHidden(displayRoomsBtn);
      addHidden(roomType);
      addHidden(pickedDate);
    }
  });
});

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const checkedUsername = checkUsername(username.value);
  const checkedPassword = checkPassword(userPassword.value);

  if (typeof checkedUsername === 'number'  && checkedPassword) {
    addHidden(loginPage);
    removeHidden(banner);
    removeHidden(welcomeMessage);
    removeHidden(coverImg);
  } else {
    falseValidation.innerText = 'Please enter a valid username and password';;
  }

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
      currentUser = getCustomer(42);
      
      updateNightsStayed();
      updateTotalSpent();
      updateCustomerStatus();
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
