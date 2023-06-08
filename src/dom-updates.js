// =========================================================
// ===============   variables and imports   ===============
// =========================================================

import { getUserPastBookings, getTotalSpent } from "./booking-utils";
import { bookings, rooms, currentUser } from "./scripts";

const userDropdownMenu = document.querySelector('#user-items');
const totalNights = document.querySelector('.total-nights');
const totalSpent = document.querySelector('.total-spent');
const displayRooms = document.querySelector('main');

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
  console.log(amoutSpent)
  totalSpent.innerText = `${amoutSpent}`;
};

const populateAvailableRooms = (date, rooms) => {
  displayRooms.innerHTML = '';
  rooms.forEach(booking => {
    displayRooms.innerHTML += `
    <article class="rooms">
      <img class="room-image" src="./images/turing-logo.png" alt="turing logo">
      <div class="room-info">
        <h3 class="room-type">${booking.roomType}</h3>
        <p class="bed-size">${booking.numBeds} ${booking.bedSize}, ${function () { if(booking.bidet) { 'Bidet' } } }</p>
        <ul class="amenities">
          <li>Wifi</li>
          <li>Air conditioner</li>
          <li>Balcony</li>
          <li>Pet Friendly</li>
          <li>Access to gym and pool</li>
        </ul>
        <p class="room-cost">$${booking.costPerNight}</p>
      </div>
    </article>
    `;
  });
};

export {
  handleDropdown,
  updateNightsStayed,
  updateTotalSpent
};