import chai from 'chai';
import { customerList } from './sample-data/sample-customer-list.js';
import { roomList } from './sample-data/sample-room-list.js';
import { bookingList } from './sample-data/sample-booking-list.js';
import { checkUsername, getCustomer } from '../src/booking-utils.js';

const expect = chai.expect;

describe('Get a customer\'s name from their username', () => {
  let user, keyword, userId, customer;

  beforeEach(() => {
    user = checkUsername('customer15');
    keyword = user.substring(0, 8);
    userId = user.substring(8);
    customer = getCustomer(user);
  });

  it('Should have a valid username, customer followed by their ID', () => {
    expect(keyword).to.deep.equal('customer');
    expect(userId).to.be.a('number');
  });

  it('Should not be case sensitive', () => {
    user = checkUsername('CusToMer15')
    keyword = user.substring(0, 8);
    expect(keyword).to.deep.equal('customer');
  });

  it('Should let the user know if the username is valid', () => {
    user = checkUsername('client15');
    expect(user).to.equal('Please enter a valid username');
  });

  it('Should return the user ID associated with the username', () => {
    expect(user).to.equal(15);
  });

  it('Should be able to get another users ID associated with the username', () => {
    user = checkUsername('customer1');
    expect(user).to.equal(1);
  });

  it('Should retrieve the customer\'s info from the username', () => {
    expect(customer).to.be.a('object');
  });

  it('Should have an ID and a name', () => {
    expect(customer).to.have.keys([ 'id', 'name' ]);
  });
});
