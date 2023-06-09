import chai from 'chai';
import { customerList } from './sample-data/sample-customer-list.js';
import { roomList } from './sample-data/sample-room-list.js';
import { bookingList } from './sample-data/sample-booking-list.js';
import { checkUsername, getUserBookings, getTotalSpent, filterOutUnavailableRooms, filterAvailableRoomsByType  } from '../src/booking-utils.js';

const expect = chai.expect;

describe('Get a customer\'s name from their username', () => {
  let userName, user, keyword, userId, customer;

  beforeEach(() => {
    userName = 'customer15';
    user = checkUsername(userName);
    keyword = userName.substring(0, 8);
    userId = parseInt(userName.substring(8));
  });

  it('Should have a valid username, customer followed by their ID', () => {
    expect(keyword).to.equal('customer');
    expect(userId).to.be.a('number');
  });

  it('Should not be case sensitive', () => {
    user = checkUsername('CusToMer15')
    expect(user).to.equal(15);
  });

  it('Should let the user know if the username is not valid', () => {
    user = checkUsername('custam15');
    expect(user).to.equal('Please enter a valid username and password');
  });

  it('Should return the user ID associated with the username', () => {
    expect(user).to.equal(15);
  });

  it('Should be able to get another users ID associated with the username', () => {
    user = checkUsername('customer1');
    expect(user).to.equal(1);
  });
});

describe(`Get a users bookings and calculate past total costs`, () => {
  let user13Bookings, user1Bookings, user2Bookings, alternativeUser13Bookings;

  beforeEach(() => {
    user1Bookings = getUserBookings('2023-06-08', 1, bookingList.bookings, 'past');
    user2Bookings = getUserBookings('2023-06-08', 2, bookingList.bookings, 'past');
    user13Bookings = getUserBookings('2023-06-08', 13, bookingList.bookings, 'past');
    alternativeUser13Bookings = getUserBookings('2022-01-17', 13, bookingList.bookings, 'past');
  });

  it('Past bookings should have specific information', () => {
    expect(user13Bookings[0]).to.have.keys([ 'id', 'userID', 'date', 'roomNumber' ]);
    expect(user13Bookings).to.have.lengthOf(2);
  });

  it('Should accommodate a change in date', () => {
    expect(alternativeUser13Bookings[0]).to.have.keys([ 'id', 'userID', 'date', 'roomNumber' ]);
    expect(alternativeUser13Bookings).to.have.lengthOf(1);
  });

  it('Should return a list of another users bookings', () => {
    expect(user1Bookings[0]).to.have.keys([ 'id', 'userID', 'date', 'roomNumber' ]);
  });

  it(`Should let the user know if they don't have past bookings`, () => {
    expect(user2Bookings).to.equal('No past bookings');
  });

  it(`Should let the user know if they don't have upcoming bookings`, () => {
    user13Bookings = getUserBookings('2023-06-08', 13, bookingList.bookings, 'upcoming');
    expect(user13Bookings).to.equal('No upcoming bookings');
  });

  it(`If the booking date is today then the booking should show up as upcoming`, () => {
    user13Bookings = getUserBookings('2022-01-19', 13, bookingList.bookings, 'upcoming');
    expect(user13Bookings).to.have.lengthOf(1);
  });

  it('Future bookings should have specific information', () => {
    user13Bookings = getUserBookings('2022-01-17', 13, bookingList.bookings, 'upcoming');
    expect(user13Bookings[0]).to.have.keys([ 'id', 'userID', 'date', 'roomNumber' ]);
    expect(user13Bookings).to.have.lengthOf(1);
  });

  it('Future bookings should have accomodate a change in date', () => {
    user13Bookings = getUserBookings('2021-01-17', 13, bookingList.bookings, 'upcoming');
    expect(user13Bookings[0]).to.have.keys([ 'id', 'userID', 'date', 'roomNumber' ]);
    expect(user13Bookings).to.have.lengthOf(2);
  });

  it('Future bookings should get another users bookings', () => {
    user1Bookings = getUserBookings('2021-01-17', 1, bookingList.bookings, 'upcoming');
    expect(user1Bookings[0]).to.have.keys([ 'id', 'userID', 'date', 'roomNumber' ]);
    expect(user1Bookings).to.have.lengthOf(1);
  });

  it('Should return the total spent for past bookings', () => {
    const totalSpent = getTotalSpent(user13Bookings, roomList.rooms);
    expect(totalSpent).to.equal('$849.54');
  });

  it('Should accomodate for date changes', () => {
    const totalSpent = getTotalSpent(alternativeUser13Bookings, roomList.rooms);
    expect(totalSpent).to.equal('$358.40');
  });

  it('Should return the total spent for another users past bookings', () => {
    const totalSpent = getTotalSpent(user1Bookings, roomList.rooms);
    expect(totalSpent).to.equal('$358.40');
  });

  it(`Should return $0 if the user has not spent any nights`, () => {
    const totalSpent = getTotalSpent(user2Bookings, roomList.rooms);
    expect(totalSpent).to.equal('$0');
  });
});

describe('Get a customer\'s name from their username', () => {
  it('Should filter out rooms that are already booked for that day', () => {
    const availableRooms = filterOutUnavailableRooms('2022-04-22', bookingList.bookings, roomList.rooms); 
    expect(availableRooms).to.have.lengthOf(1);
  });

  it('Should filter out rooms that are already booked for a different day', () => {
    const availableRooms = filterOutUnavailableRooms('2022-02-05', bookingList.bookings, roomList.rooms); 
    expect(availableRooms).to.have.lengthOf(2);
  });

  it('Should return all rooms if no rooms are booked for the day', () => {
    const availableRooms = filterOutUnavailableRooms('2022-02-04', bookingList.bookings, roomList.rooms); 
    expect(availableRooms).to.have.lengthOf(3);
  });
});

describe('It should return rooms by selected type', () => {
  let availableRooms;

  beforeEach(() => {
    availableRooms = filterOutUnavailableRooms('2022-02-04', bookingList.bookings, roomList.rooms);
  });

  it('Should return all rooms if no room type has been selected', () => {
    const filteredAvailableRooms = filterAvailableRoomsByType(availableRooms); 
    expect(filteredAvailableRooms).to.have.lengthOf(3);
  });

  it('Should return all rooms if the option all rooms is selected', () => {
    const filteredAvailableRooms = filterAvailableRoomsByType(availableRooms, 'All Rooms'); 
    expect(filteredAvailableRooms).to.have.lengthOf(3);
  });

  it('Should return all rooms if an option is selected', () => {
    const filteredAvailableRooms = filterAvailableRoomsByType(availableRooms, 'suite'); 
    expect(filteredAvailableRooms).to.have.lengthOf(1);
  });

  it('Should return all rooms if a different option is selected', () => {
    const filteredAvailableRooms = filterAvailableRoomsByType(availableRooms, 'single room'); 
    expect(filteredAvailableRooms).to.have.lengthOf(1);
  });
});