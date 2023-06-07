import chai from 'chai';
import { customerList } from './sample-data/sample-customer-list.js';
import { roomList } from './sample-data/sample-room-list.js';
import { bookingList } from './sample-data/sample-booking-list.js';
import { checkUsername, getUserPastBookings  } from '../src/booking-utils.js';

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

describe(`Get a users past booking`, () => {
  it('Should return a list of past bookings', () => {
    const userBookings = getUserPastBookings(13, bookingList.bookings);
    expect(userBookings[0]).to.have.keys([ 'id', 'userID', 'date', 'roomNumber' ]);
  });

  it('Should return a list of another users bookings', () => {
    const userBookings = getUserPastBookings(1, bookingList.bookings);
    expect(userBookings[0]).to.have.keys([ 'id', 'userID', 'date', 'roomNumber' ]);
  });

  it(`Should let the user know if they don't have past bookings`, () => {
    const userBookings = getUserPastBookings(2, bookingList.bookings);
    expect(userBookings).to.equal('No past bookings');
  });
});

describe(`Should calculate total spent in the past`, () => {
  it('Should return the total spent for past bookings', () => {
    const userBookings = getUserPastBookings(13, bookingList.bookings);
    const totalSpent = getTotalSpent(userBookings);
    expect(totalSpent).to.equal('$516.04');
  });

  it('Should return the total spent for another users past bookings', () => {
    const userBookings = getUserPastBookings(1, bookingList.bookings);
    const totalSpent = getTotalSpent(userBookings);
    expect(totalSpent).to.equal('$172.09');
  });

  it(`Should return $0 if the user has not spent any nights`, () => {
    const userBookings = getUserPastBookings(2, bookingList.bookings);
    const totalSpent = getTotalSpent(userBookings);
    expect(totalSpent).to.equal('$0');
  });
});