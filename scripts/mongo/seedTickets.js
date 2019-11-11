// DEBUG=app:* node scripts/mongo/seedTickets.js

const chalk = require('chalk');
const debug = require('debug')('app:scripts:tickets');
const MongoLib = require('../../lib/mongo');
const { TicketsMock } = require('../../utils/mocks/tickets');

async function seedTickets() {
  try {
    const mongoDB = new MongoLib();

    const promises = TicketsMock.map(async ticket => {
      await mongoDB.create('tickets', ticket);
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} Tickets have been created succesfully`)); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedTickets();