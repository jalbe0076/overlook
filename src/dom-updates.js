// =========================================================
// ===============   variables and imports   ===============
// =========================================================

import { getUserBookings, getTotalSpent, formatDate, getTodaysDate, filterOutUnavailableRooms, formatRoomToPost } from "./booking-utils";
import { bookings, rooms, setData } from "./scripts";

const userDropdownMenu = document.querySelector('#user-items');
const totalNights = document.querySelector('.total-nights');
const totalSpent = document.querySelector('.total-spent');
const displayRooms = document.querySelector('.available-rooms');
const userProfile = document.querySelector('.user-name');
const welcomeUser = document.querySelector('.welcome-user');
const pickedDate = document.querySelector('#pick-day');
const bookingModal = document.querySelector('.modal');
const innerModal = document.querySelector('.inner-modal');
const tripMessage = document.querySelector('.trip-message');
const vipStatus = document.querySelector('.vip-status');
const navBtns = document.querySelectorAll('.nav-tab');
const welcomeMessage = document.querySelector('.welcome-message');
const coverImg = document.querySelector('.cover');
const banner = document.querySelector('.banner');

const todaysDate = getTodaysDate();
let lastFocusedElement;
let currentUser;

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

const updateCustomerStatus = () => {
  const nightsStayed = getUserBookings(todaysDate, currentUser.id, bookings, 'past').length;

  if (nightsStayed < 10) {
    vipStatus.innerHTML = `Prefered Customer`;
  } else if (nightsStayed < 20) {
    vipStatus.innerHTML = `Loyal Customer`;
  } else {
    vipStatus.innerHTML = `<img src="./images/customer-rating.png">VIP Customer`;
  }
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
      <article class="rooms" tabindex="0">
        <img class="room-image" src="${handleRoomImage(room)}" alt="turing logo">
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
      <article class="rooms"  tabindex="0" id="${room.number}">
        <img class="room-image" src="${handleRoomImage(room)}" alt="turing logo">
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

const removeBookings = ()  => {
  displayRooms.innerHTML = '';
};

const displayTripMessage = (roomStatus) => {
  tripMessage.innerText = roomStatus;
};

const resetTripMessage = (message) => {
  if (typeof message === 'string') {
    tripMessage.innerText = `${message}`;
  } else {
    tripMessage.innerText = ``;
  }
}

const populateUserWelcome = (usersName) => {
  const firstName = usersName.split(' ')[0];
  welcomeUser.innerText = `Welcome, ${firstName}!`;
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
      <img class="room-image" src="${handleRoomImage(room)}" alt="turing logo">
      <div class="room-info modal-info">
        <button class="modal-esc" id="modal-esc">X</button>
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
        <button class="book-room" id="book-room">BOOK NOW!</button>
        <button class="another-room" id="another-room">PICK ANOTHER ROOM</button>
      </div>
    </article>`;

  const confirmBookingBtn = document.querySelector('.book-room');
  const anotherBookingBtn = document.querySelector('.another-room');
  const modalEsc = document.querySelector('.modal-esc');
  confirmBookingBtn.focus();

  const tabTrap = (e) => {
    if (e.keyCode === 9 && document.activeElement.id === 'another-room') {
      confirmBookingBtn.focus();
      
    }

    if (e.keyCode === 9 && e.shiftKey && document.activeElement.id === 'modal-esc') {
      confirmBookingBtn.focus();
    }
  };

  modalEsc.addEventListener('keydown', tabTrap);

  confirmBookingBtn.addEventListener('click', () => {
   showConfirmedBooking(room, date);
  });

  anotherBookingBtn.addEventListener('keydown', tabTrap);

  anotherBookingBtn.addEventListener('click', (e) => {
    addHidden(bookingModal);
  });
  modalEsc.addEventListener('click', (e) => {
    addHidden(bookingModal);
  });
};

const showConfirmedBooking = (room, date) => {
  const firstName = currentUser.name.split(' ')[0];
  const formatedDate = formatDate(date);
  const bookRoomReceipt = formatRoomToPost(formatedDate, room, currentUser.id);

  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify(bookRoomReceipt),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then((response) => {

    innerModal.innerHTML = `
      <article class="rooms">
        <img class="room-image" src="${handleRoomImage(room)}" alt="turing logo">
        <div class="room-info modal-info">
          <button class="modal-esc" id="modal-esc">X</button>
          <h3 class="booking-thanks">${firstName}, thank you for booking a ${room.roomType} with us</h3>
          <p class="booking-date">Your booking is confirmed on ${formatedDate}</p>
          <p class="reference">Your booking reference: ${response.newBooking.id}</p>
          <button class="return-main">return </button>
        </div>
      </article>`;
      setData();

      const closeBookingReferenceBtn = document.querySelector('.return-main');
      const modalEsc = document.querySelector('.modal-esc');

      closeBookingReferenceBtn.focus();

      closeBookingReferenceBtn.addEventListener('click', () => {
        displayRooms.innerHTML = '';
        addHidden(bookingModal);
        removeHidden(welcomeMessage);
        removeHidden(coverImg);
        banner.style.background = 'none';
      });

      modalEsc.addEventListener('click', () => {
        displayRooms.innerHTML = '';
        addHidden(bookingModal);
        removeHidden(welcomeMessage);
        removeHidden(coverImg);
        banner.style.background = 'none';
      });
    })   
    .catch(err => console.log("ERROR", err));
};

const handleRoomImage = (room) => {
  
  if (room.numBeds === 1 && room.roomType === 'single room') {
    return `./images/single-room.jpg`;
  } else if (room.numBeds === 2 && room.roomType === 'single room') {
    return `./images/double-room.jpg`;
  } else if (room.numBeds === 1 && room.roomType === 'junior suite') {
    return `./images/single-junior-suite.jpg`;
  } else if (room.numBeds === 2 && room.roomType === 'junior suite') {
    return `./images/double-junior-suite.jpg`;
  } else if (room.numBeds === 1 && room.roomType === 'suite') {
    return `./images/single-suite.jpg`;
  } else if (room.numBeds === 2 && room.roomType === 'suite') {
    return `./images/double-suite.jpg`;
  } else if (room.numBeds === 1 && room.roomType === 'residential suite') {
    return `./images/single-residential-suite.jpg`;
  } else {
    return `./images/double-residential-suite.jpg`;
  }
};

const handleActiveBtn = () => {
  navBtns.forEach(button => {
    button.classList.remove('nav-tab-active');
    button.style.color = '#636363'
  });
};

const addHidden = (element) => {
  element.classList.add('hidden');
}

const removeHidden = (element) => {
  element.classList.remove('hidden');
}

const getUserInfo = (user) => {
  currentUser = user;
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
  displayTripMessage,
  resetTripMessage,
  updateCustomerStatus,
  handleActiveBtn,
  addHidden,
  removeHidden,
  removeBookings,
  getUserInfo,
};
