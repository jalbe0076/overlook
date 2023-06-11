// =========================================================
// ===============   variables and imports   ===============
// =========================================================





// =========================================================
// =====================   functions   =====================
// =========================================================

const getTodaysDate = () => {
  let date = new Date().toLocaleDateString("en-CA");
  return date;
};

const formatDate = (date) => {
  return date.replaceAll('-', '/');
};

const checkUsername = (username) => {
  const user = username.toLowerCase();
  const keyword = user.substring(0, 8);
  const userId = parseInt(user.substring(8));

  if (keyword !== 'customer' || isNaN(userId)) {
    return 'Please enter a valid username and password';
  }

  return userId;
};

const getUserBookings = (date, userId, bookings, timeline) => {
  const userBookings = bookings.filter((bookings) => bookings.userID === userId);
  const todaysDate = formatDate(date);
  let timelineBookings;

  if (timeline === 'past') {
    timelineBookings = userBookings.filter(booking => todaysDate > booking.date);
  } else {
    timelineBookings = userBookings.filter(booking => todaysDate <= booking.date);
  }

  if (!timelineBookings.length) {
    return `No ${timeline} bookings${timeline === 'upcoming' ? ', book with us today!' : ''}`;
  } else {
    return timelineBookings;
  }  
};

const getTotalSpent = (userBookings, roomList) => {
  let totalSpent = 0;
  
  if (!Array.isArray(userBookings)) {
    return `$0`;
  } else {
    userBookings.forEach(booking => {
      const room = roomList.find(room => room.number === booking.roomNumber);
      totalSpent += room.costPerNight;
    });
  }

  return `$${totalSpent.toFixed(2)}`;
};

const filterOutUnavailableRooms = (date, bookings, rooms) => {
  const formatedDate = formatDate(date)
  const unavailableRooms = bookings.filter(booking => booking.date === formatedDate).map(unavailableRoom => unavailableRoom.roomNumber);
  const availableRooms = rooms.filter(room => !unavailableRooms.includes(room.number))

  return availableRooms;
};

const filterAvailableRoomsByType = (availableRooms, filterType, date) => {
  if (!availableRooms.length && filterType !== 'upcoming') { 
    return `Sorry, we are fully booked on ${date}, please consider staying with us another night`;
  } 

  if (filterType === 'All Rooms' || filterType === undefined) {
    return availableRooms;
  } else {
    const roomType = filterType.toLowerCase();
    const filteredAvailableRooms = availableRooms.filter(room => room.roomType === roomType);

    return filteredAvailableRooms;
  }
};

const findRoom = (roomNumber, rooms) => {
  return rooms.find(room => room.number === parseInt(roomNumber))
};

const formatRoomToPost = (date, room, userId) => {
  return { 
    userID: userId, 
    date: date, 
    roomNumber: room.number 
  };
};

const checkPassword = (password) => {
  return password === 'overlook2021' ? true : false;
};

export {
  checkUsername,
  getUserBookings,
  getTotalSpent,
  formatDate,
  getTodaysDate,
  filterOutUnavailableRooms,
  filterAvailableRoomsByType,
  findRoom,
  formatRoomToPost,
  checkPassword
};
