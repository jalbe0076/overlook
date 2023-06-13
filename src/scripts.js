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
import './images/booking-page.jpg';
import { getAllData, findCustomer } from './api-calls'
import { handleDropdown, 
  updateNightsStayed, 
  updateTotalSpent, 
  populateBookings, 
  populateUserProfile, 
  populateUserWelcome, 
  populateAvailableRooms, 
  setCalendarDates, 
  showRoomModal, 
  displayTripMessage, 
  resetTripMessage, 
  updateCustomerStatus, 
  handleActiveBtn, 
  addHidden, 
  removeHidden, 
  removeBookings, 
  getUserInfo, 
  userDropdownMenu,
  pickedDate,
  bookingModal,
  navBtns,
  welcomeMessage,
  coverImg,
  banner, 
  viewDashboardBackground,
  adjustBannerStyleBg,
  displayUserError,
  resetRoomDisplay } from './dom-updates';
import { getUserBookings, getTodaysDate, filterOutUnavailableRooms, filterAvailableRoomsByType, findRoom, checkPassword, checkUsername } from './booking-utils';

let customers;
let rooms;
let bookings;
let currentUser;
let userBookings;
let selectedDate;
let bookingConfirmed = false;
const todaysDate = getTodaysDate();
const pastTrips = document.querySelector('#past-trips');
const futureTrips = document.querySelector('#upcoming-trips')
const dropdownLinks = document.querySelector('.user-profile');
const formData = document.querySelector('#booking-options');
const roomType = document.querySelector('#room-types');
const displayRoomsBtn = document.querySelector('.see-available-rooms');
const loginBtn = document.querySelector('.login-btn');
const userPassword = document.querySelector('#password');
const username = document.querySelector('#username');
const loginPage = document.querySelector('.modal-login');
const userLogout = document.querySelector('#user-logout');
const loginForm = document.querySelector('#login');
const listenPageClick = document.querySelector('#page');

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
    adjustBannerStyleBg(true);
  } else {
    removeBookings();
    banner.style.background = 'none';
  }
});

futureTrips.addEventListener('click', () => {
  userBookings = getUserBookings(todaysDate, currentUser.id, bookings, 'upcoming');
  resetTripMessage(userBookings);

  if (typeof userBookings === 'object') {
    populateBookings(userBookings, rooms);
    viewDashboardBackground(false);
  } else {
    removeBookings(userBookings);
    viewDashboardBackground(false);
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
    removeBookings();
    displayTripMessage(filteredRooms);
    viewDashboardBackground(true);
  } else {
    populateAvailableRooms(filteredRooms);
    viewDashboardBackground(false);
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
    button.style.color = '#212427';
    
    if (button.id === 'bookings') {
      removeHidden(displayRoomsBtn);
      removeHidden(roomType);
      removeHidden(pickedDate);
      resetRoomDisplay();
      resetTripMessage();
      removeBookings(userBookings);
      viewDashboardBackground(true);
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
    
    getCustomer(checkedUsername)
      .then((user) => {
        currentUser = user;
        getUserInfo(user);
        updateNightsStayed();
        updateTotalSpent();
        updateCustomerStatus();
        populateUserProfile(user.name);
        populateUserWelcome(user.name);
      });
  } else {
    displayUserError(true);
  }

  loginForm.reset();
});

bookingModal.addEventListener('click', (e) => { 
  if (e.target.classList.contains('book-room')) {
    bookingConfirmed = true;
  }

  if (e.target.classList.contains('modal') && !bookingConfirmed){
    addHidden(bookingModal); 
  } else if (e.target.classList.contains('modal') && bookingConfirmed) {
    addHidden(bookingModal);
    viewDashboardBackground(true)
    resetRoomDisplay();
  }
  bookingConfirmed = false;
});

userLogout.addEventListener('click', () => {
  removeHidden(loginPage);
  addHidden(banner);
  adjustBannerStyleBg(false);
  addHidden(welcomeMessage);
  addHidden(coverImg);
  userDropdownMenu.setAttribute('aria-expanded', 'false');
  resetRoomDisplay();
  currentUser = undefined;
  displayUserError(false);
});

listenPageClick.addEventListener('click', (e) => {
  if (e.target !== userDropdownMenu && !userDropdownMenu.contains(e.target) && !e.target.parentNode.classList.contains('user-profile-drop')) {
    userDropdownMenu.setAttribute('aria-expanded', 'false');
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
    });
};

const getCustomer = (userId) => {
  return findCustomer(userId);
};

export {
  bookings,
  setData,
  rooms,
  loginPage
};
