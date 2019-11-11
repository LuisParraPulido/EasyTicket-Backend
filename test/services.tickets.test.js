const assert = require('assert');
const proxyquire = require('proxyquire');

const { MongoLibMock, getAllStub } = require('../utils/mocks/mongoLib');

const { ticketsMock } = require('../utils/mocks/tickets');

describe('services - tickets', function() {
  const TicketsServices = proxyquire('../services/tickets', {
    '../lib/mongo': MongoLibMock
  });
  
  const ticketsService = new TicketsServices();

  describe('when getTickets method is called', async function() {
    it('should call the getall MongoLib method', async function() {
      await ticketsService.getTickets({});
      assert.strictEqual(getAllStub.called, true);
    });

    it('should return an array of tickets', async function() {
      const result = await ticketsService.getTickets({});
      const expected = ticketsMock;
      assert.deepEqual(result, expected)
    })

  });
});