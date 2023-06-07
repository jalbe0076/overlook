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

export {
  checkUsername,
  getUserPastBookings
}