// =========================================================
// =====================   functions   =====================
// =========================================================

const checkUsername = (username) => {
  const user = username.toLowerCase();
  const keyword = user.substring(0, 8);
  const userId = parseInt(user.substring(8));

  if(keyword !== 'customer' || isNaN(userId)) {
    return 'Please enter a valid username and password';
  }

  return userId;
};

export {
  checkUsername,
}