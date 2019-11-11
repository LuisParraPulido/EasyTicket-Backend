const sinon = require('sinon');

const { ticketsMock } = require('./tickets');

const getAllStub = sinon.stub();
getAllStub.withArgs('tickets').resolves(ticketsMock);

// const tagQuery = { : { $in: [''] } };//f
// getAllStub.withArgs('tickets', tagQuery).resolves(filteredTicketsMock(''));

const createStub = sinon.stub().resolves(ticketsMock[0].id);

class MongoLibMock {
  getAll(collection, query) {
    return getAllStub(collection, query);
  }
  create(collection, data) {
    return createStub(collection, data);
  }
}

module.exports = {
  getAllStub,
  createStub,
  MongoLibMock
}