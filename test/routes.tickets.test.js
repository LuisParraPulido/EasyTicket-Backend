const assert = require('assert');
const proxyquire = require('proxyquire');

const { ticketsMock, TicketsServiceMock } = require('../utils/mocks/tickets.js');
const testServer = require('../utils/testServer');

describe('routes - tickets', function() {
  const route = proxyquire('../routes/tickets', {
    '../services/tickets': TicketsServiceMock
  });

  const request = testServer(route);
  describe('GET /tickets', function() {
    it('should respond with status 200', function(done) {
      request.get('/api/tickets').expect(200, done);
    });
    
    it('should respond with the list of tickets', function(done) {
      request.get('/api/tickets').end((err, res) => {
        assert.deepEqual(res.body, {
          data: ticketsMock,
          message: 'tickets listed'
        });
        done();
      })
    })
  })
})
