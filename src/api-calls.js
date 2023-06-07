import { setData } from "./scripts";

const getData = (data) => {
  return fetch(`http://localhost:3001/api/v1/${data}`)
      .then(response => response.json())
      .catch(error => console.log("ERROR", error));
};

const postBooking = (room) => {
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify(room),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(() => setData())
    .catch(err => console.log("ERROR", err));
};

const getAllData = () => {
  return Promise.all([ getData('customers'), getData('rooms'), getData('bookings') ]);
};

export {
  getAllData,
  getData,
  postBooking
};