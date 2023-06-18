import { handelErrorMessage } from "./dom-updates";
import { setData } from "./scripts";

const getData = (data) => {
  return fetch(`https://overlook-api-seven.vercel.app/api/v1/${data}`)
      .then(response => errorHandle(response))
      .catch(error => handelErrorMessage(error));
};

const getAllData = () => {
  return Promise.all([ getData('customers'), getData('rooms'), getData('bookings') ]);
};

const postBooking = (data) => {
  return fetch('https://overlook-api-seven.vercel.app/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => errorHandle(response))
};

const deleteBooking = (id) => {
  fetch(`https://overlook-api-seven.vercel.app/api/v1/bookings/${id}`, {
    method: 'DELETE',
    body: '',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => errorHandle(response))
    .then(() => setData())
    .catch(error => handelErrorMessage(error));
};

const findCustomer = (id) => {
  return fetch(`https://overlook-api-seven.vercel.app/api/v1/customers/${id}`)
      .then(response => errorHandle(response))
      .then(resolve => {
        return resolve
      })
      .catch(error => handelErrorMessage(error));
};

const errorHandle = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`${response.status}  ${response.statusText}`);
  }
};

export {
  getAllData,
  getData,
  deleteBooking,
  findCustomer,
  errorHandle,
  postBooking
};
