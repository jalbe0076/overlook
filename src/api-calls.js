import { setData } from "./scripts";

const getData = (data) => {
  return fetch(`http://localhost:3001/api/v1/${data}`)
      .then(response => errorHandle(response))
      .catch(error => alert(`${error.message}`));
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
    .then(response => errorHandle(response))
    .then(() => setData())
    .catch(error => alert(`${error.message}`));
};

const findCustomer = (id) => {
  return fetch(`http://localhost:3001/api/v1/customers/${id}`)
      .then(response => errorHandle(response))
      .then(resolve => {
        return resolve
      })
      .catch(error => alert(`${error.message}`));
};

const errorHandle = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    
    throw new Error(`${response.statusText}`);
  }
};

export {
  getAllData,
  getData,
  deleteBooking,
  findCustomer,
};
