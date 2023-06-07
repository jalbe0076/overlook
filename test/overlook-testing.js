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
  let  userId, userBookings;

  beforeEach(() => {
    userId = 15;
    const bookings = bookingList.bookings;
    userBookings = getUserPastBookings(userId, bookings)
  });

  it('Should return a list of past bookings', () => {
    expect(userBookings[0]).to.have.keys([ 'id', 'userID', 'date', 'roomNumber' ]);
  });

  it('Should return a list of another users bookings', () => {
    user = 1;
    userBookings = getUserPastBookings(userId, bookings);
    expect(userBookings[0]).to.have.keys([ 'id', 'userID', 'date', 'roomNumber' ]);
  });

  it(`Should let the user know if they don't have past bookings`, () => {
    user = 2;
    userBookings = getUserPastBookings(userId, bookings);
    expect(userBookings).to.equal('No past bookings');
  });
});