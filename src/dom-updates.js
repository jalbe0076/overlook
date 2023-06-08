// =========================================================
// ===============   variables and imports   ===============
// =========================================================

import { getUserPastBookings, getTotalSpent, formatDate } from "./booking-utils";
import { bookings, rooms, currentUser } from "./scripts";

const userDropdownMenu = document.querySelector('#user-items');
const totalNights = document.querySelector('.total-nights');
const totalSpent = document.querySelector('.total-spent');
const displayRooms = document.querySelector('main');
const userProfile = document.querySelector('.user-profile');
const welcomeUser = document.querySelector('.welcome-user');

let lastFocusedElement;

// =========================================================
// =====================   functions   =====================
// =========================================================

const handleDropdown = (e) => {
  if (userDropdownMenu.getAttribute('aria-expanded') === 'true') {
    userDropdownMenu.setAttribute('aria-expanded', 'false');
  } else {
    userDropdownMenu.setAttribute('aria-expanded', 'true');
  }

  let focusableElements = userDropdownMenu.querySelectorAll('a')
  lastFocusedElement = document.activeElement;
  focusableElements[0].focus();
  focusableElements.forEach(link => link.addEventListener('keydown', handleToggleEscape))
};

const handleToggleEscape = (e) => {
  if (e.keyCode === 9 && document.activeElement.id === 'user-logout') {
    lastFocusedElement.click();
  }

  if (e.keyCode === 9 && e.shiftKey && document.activeElement.id === 'user-settings') {
    lastFocusedElement.click();
  }

  if (e.keyCode === 27) {
    lastFocusedElement.click();
  }
};

const updateNightsStayed = () => {
  const nightsStayed = getUserPastBookings(currentUser.id, bookings);
  totalNights.innerText = `${nightsStayed.length}`;
};

const updateTotalSpent = () => {
  const nightsStayed = getUserPastBookings(currentUser.id, bookings);
  const amoutSpent = getTotalSpent(nightsStayed, rooms);
  totalSpent.innerText = `${amoutSpent}`;
};

const populateBookings = (date, bookings, rooms, timeline) => {
  displayRooms.innerHTML = '';
  const formatedDate = formatDate(date);
  let timelineBookings;

  if (timeline === 'past') {
    timelineBookings = bookings.filter(booking => formatedDate > booking.date);
  } else {
    timelineBookings = bookings.filter(booking => formatedDate <= booking.date);
  }
  
  timelineBookings.forEach(booking => {
      const room = rooms.find(room => room.number === booking.roomNumber);

      displayRooms.innerHTML += `
      <article class="rooms">
        <img class="room-image" src="./images/turing-logo.png" alt="turing logo">
        <div class="room-info">
          <h3 class="room-type">${room.roomType}</h3>
          <p class="bed-size">${room.numBeds} ${room.bedSize}${room.bidet ? ', Bidet' : '' }</p>
          <ul class="amenities">
            <li>Wifi</li>
            <li>Air conditioner</li>
            <li>Balcony</li>
            <li>Pet Friendly</li>
            <li>Access to gym and pool</li>
          </ul>
          <p class="booked-date">Date: ${booking.date}</p>
          <p class="reference">Booking Reference: ${booking.id}</p>
          <p class="room-cost">$${room.costPerNight}</p>
        </div>
      </article>
      `;
  });
};

const populateAvailableRooms = (date, bookings, rooms) => {
  displayRooms.innerHTML = '';
  const formatedDate = formatDate(date)
  const unavailableRooms = bookings.filter(booking => booking.date === formatedDate);

  rooms.forEach(room => {
    if(unavailableRooms.find(bookedRoom => bookedRoom.Number.includes(room.roomNumber))) {
      displayRooms.innerHTML += `
      <article class="rooms">
        <img class="room-image" src="./images/turing-logo.png" alt="turing logo">
        <div class="room-info">
          <h3 class="room-type">${room.roomType}</h3>
          <p class="bed-size">${room.numBeds} ${room.bedSize}${function () { if(room.bidet) { ', Bidet' } } }</p>
          <ul class="amenities">
            <li>Wifi</li>
            <li>Air conditioner</li>
            <li>Balcony</li>
            <li>Pet Friendly</li>
            <li>Access to gym and pool</li>
          </ul>
          <p class="room-cost">$${room.costPerNight}</p>
        </div>
      </article>
      `;
    }
  });
};

const populateUserWelcome = (usersName) => {
  const firstName = usersName.split(' ')[0];
  welcomeUser.innerText = `Welcome, ${firstName}`;
};

const populateUserProfile = (usersName) => {
  userProfile.innerText = `${usersName}`;
};

export {
  handleDropdown,
  updateNightsStayed,
  updateTotalSpent,
  populateBookings,
  populateUserWelcome,
  populateUserProfile
};