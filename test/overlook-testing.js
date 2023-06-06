import chai from 'chai';
import { customerList } from './sample-data/sample-customer-list.js';
import { roomList } from './sample-data/sample-room-list.js';
import { bookingList } from './sample-data/sample-booking-list.js';

const expect = chai.expect;

describe('See if the tests are running', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
  });
});
