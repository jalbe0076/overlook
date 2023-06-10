import { setData } from "./scripts";

const getData = (data) => {
  return fetch(`http://localhost:3001/api/v1/${data}`)
      .then(response => response.json())
      .catch(error => console.log("ERROR", error));
};

const getAllData = () => {
  return Promise.all([ getData('customers'), getData('rooms'), getData('bookings') ]);
};

const deleteBooking = (id) => {
  fetch(`http://localhost:3001/api/v1/bookings/${id}`, {
    method: 'DELETE',
    body: '',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(() => setData())
    .catch(err => console.log("ERROR", err));
};

const findCustomer = (id) => {
  return fetch(`http://localhost:3001/api/v1/customers/${id}`)
      .then(response => response.json())
      .then(resolve => {
        console.log('resolve', resolve) 
        return resolve
      })
      .catch(error => console.log("ERROR", error));
};

export {
  getAllData,
  getData,
  deleteBooking,
  findCustomer,
};
