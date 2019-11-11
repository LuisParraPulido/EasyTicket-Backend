const MongoLib = require('../lib/mongo');

class UserTicketsService {
  constructor() {
    this.collection = 'user-tickets';
    this.mongoDB = new MongoLib();
  }

  async getUsertickets({ userId }) {
    const query = userId && { userId };
    const userTickets = await this.mongoDB.getAll(this.collection, query);

    return userTickets || [];
  }
  //comprar ticket y agregarlo al perfil
  async createUserTicket({ userTicket }) {
    const createdUserticketId = await this.mongoDB.create(this.collection, userTicket);

    return createdUserticketId;
  }
  //revender el ticket y borrarlo de la cuenta al confirmar compra
  async deleteUseTicket({ userTicketId }) {
    const deletedUserTicketId = await this.mongoDB.delete(this.collection, userTicketId);

    return deletedUserTicketId;
  }
}

module.exports = UserTicketsService;