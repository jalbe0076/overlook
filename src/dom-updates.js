// =========================================================
// ===============   variables and imports   ===============
// =========================================================

import { getUserBookings, getTotalSpent, formatDate, getTodaysDate, filterOutUnavailableRooms } from "./booking-utils";
import { bookings, rooms, currentUser } from "./scripts";

const userDropdownMenu = document.querySelector('#user-items');
const totalNights = document.querySelector('.total-nights');
const totalSpent = document.querySelector('.total-spent');
const displayRooms = document.querySelector('.available-rooms');
const userProfile = document.querySelector('.user-profile');
const welcomeUser = document.querySelector('.welcome-user');
const pickedDate = document.querySelector('#pick-day');
const bookingModal = document.querySelector('.modal');
const innerModal = document.querySelector('.inner-modal');

const todaysDate = getTodaysDate();
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
  const nightsStayed = getUserBookings(todaysDate, currentUser.id, bookings, 'past');
  totalNights.innerText = `${nightsStayed.length}`;
};

const updateTotalSpent = () => {
  const nightsStayed = getUserBookings(todaysDate, currentUser.id, bookings, 'past');
  const amoutSpent = getTotalSpent(nightsStayed, rooms);
  totalSpent.innerText = `${amoutSpent}`;
};

const populateBookings = (bookings, rooms) => {
  displayRooms.innerHTML = '';

  bookings.forEach(booking => {
      const room = rooms.find(room => room.number === booking.roomNumber);

      displayRooms.innerHTML += `
      <article class="rooms">
        <img class="room-image" src="./images/turing-logo.png" alt="turing logo">
        <div class="room-info">
          <h3 class="room-type">${room.roomType}</h3>
          <p class="bed-size">${room.numBeds} ${room.bedSize}${room.bidet ? ', Bidet' : '' }</p>
          <ul class="amenities">Amenities
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
      </article>`;
  });
};

const populateAvailableRooms = (availableRooms) => {
  displayRooms.innerHTML = '';

  availableRooms.forEach(room => {
    displayRooms.innerHTML += `
      <article class="rooms" id="${room.number}">
        <img class="room-image" src="./images/turing-logo.png" alt="turing logo">
        <div class="room-info">
          <h3 class="room-type">${room.roomType}</h3>
          <p class="bed-size">${room.numBeds} ${room.bedSize}${room.bidet ? ', Bidet' : '' }</p>
          <ul class="amenities">Amenities
            <li>Wifi</li>
            <li>Air conditioner</li>
            <li>Balcony</li>
            <li>Pet Friendly</li>
            <li>Access to gym and pool</li>
          </ul>
          <p class="room-cost">$${room.costPerNight}</p>
        </div>
      </article>`;
  });
};

const populateUserWelcome = (usersName) => {
  const firstName = usersName.split(' ')[0];
  welcomeUser.innerText = `Welcome, ${firstName}`;
};

const populateUserProfile = (usersName) => {
  userProfile.innerText = `${usersName}`;
};

const setCalendarDates = () => {
  pickedDate.value = todaysDate;
  pickedDate.min = todaysDate;
};

const showRoomModal = (room, date) => {
  bookingModal.classList.toggle('hidden');
  innerModal.innerHTML = `
  <article class="rooms" id="${room.number}">
    <img class="room-image" src="./images/turing-logo.png" alt="turing logo">
    <div class="room-info">
      <h3 class="room-type">${room.roomType}</h3>
      <p class="bed-size">${room.numBeds} ${room.bedSize}${room.bidet ? ', Bidet' : '' }</p>
      <ul class="amenities">Amenities
        <li>Wifi</li>
        <li>Air conditioner</li>
        <li>Balcony</li>
        <li>Pet Friendly</li>
        <li>Access to gym and pool</li>
      </ul>
      <p class="booked-date" id="${date}">Stay with us on ${date}</p>
      <p class="room-cost">$${room.costPerNight}</p>
      <button class="book-room">BOOK NOW!</button>
      <button class="another-room">PICK ANOTHER ROOM</button>
    </div>
  </article>`;

  const modalBookingBtn = document.querySelector('.book-room');
  const anotherBooking = document.querySelector('.another-room');

  modalBookingBtn.addEventListener('click', (e) => {
    showConfirmedBooking(room, date);
  });

  anotherBooking.addEventListener('click', (e) => {
    bookingModal.classList.add('hidden');
  });
};

const showConfirmedBooking = (room, date) => {
  const firstName = currentUser.name.split(' ')[0];

  innerModal.innerHTML = `
    <article class="rooms">
      <img class="room-image" src="./images/turing-logo.png" alt="turing logo">
      <div class="room-info">
        <h3 class="booking-thanks">${firstName}, thank you for booking a ${room.roomType} with us</h3>
        <p class="booking-date">Your booking is confirmed on ${date}</p>
        <p class="reference">Your booking reference: </p>
        <button class="book-room">return </button>
      </div>
    </article>`;
};

export {
  handleDropdown,
  updateNightsStayed,
  updateTotalSpent,
  populateBookings,
  populateUserWelcome,
  populateUserProfile,
  populateAvailableRooms,
  setCalendarDates,
  showRoomModal,
};
