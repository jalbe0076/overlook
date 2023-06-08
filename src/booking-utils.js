// =========================================================
// ===============   variables and imports   ===============
// =========================================================





// =========================================================
// =====================   functions   =====================
// =========================================================

const getDate = () => {
  let date = new Date().toLocaleDateString("en-CA").replaceAll('-', '/');
  return date;
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

const getUserPastBookings = (userId, bookings) => {
  const userBookings = bookings.filter(bookings => bookings.userID === userId);

  if (!userBookings.length) {
    return 'No past bookings';
  } else {
    return userBookings;
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
  getUserPastBookings,
  getTotalSpent
};