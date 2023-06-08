// =========================================================
// ===============   variables and imports   ===============
// =========================================================

import { getUserPastBookings, getTotalSpent } from "./booking-utils";
import { bookings, rooms, currentUser } from "./scripts";

const userDropdownMenu = document.querySelector('#user-items');
const totalNights = document.querySelector('.total-nights');
const totalSpent = document.querySelector('.total-spent');

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

export {
  handleDropdown,
  updateNightsStayed,
  updateTotalSpent
};