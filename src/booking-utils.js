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
    timelineBookings = userBookings.filter(booking => todaysDate < booking.date);
  }

  if (!timelineBookings.length) {
    return `No ${timeline} bookings`;
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

export {
  checkUsername,
  getUserBookings,
  getTotalSpent,
  formatDate,
  getTodaysDate
};