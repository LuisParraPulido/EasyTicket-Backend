const MongoLib = require('../lib/mongo');

class SoldTicketsService {
  constructor() {
    this.collection = 'soldTickets';
    this.mongoDB = new MongoLib;
  }
  async getTickets() {
    const tickets = await this.mongoDB.getAll(this.collection)
    return tickets || [];
  }

  async getTicket({ ticketId }) {
    const ticket = await this.mongoDB.get(this.collection, ticketId)
    return ticket || [];
  }

  async createTicket({ ticket }) {
    const createTicketId = await this.mongoDB.create(this.collection, ticket)
    return createTicketId;
  }

  async updateTicket({ ticketId, ticket } = {}) {
    const updatedTicketId = await this.mongoDB.update(this.collection, ticketId, ticket)
    return updatedTicketId;
  }

  async deleteTicket({ ticketId }) {
    const deletedTicketId = await this.mongoDB.delete(this.collection, ticketId)
    return deletedTicketId;
  }

}

module.exports = SoldTicketsService;