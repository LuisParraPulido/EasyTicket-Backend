const joi = require('@hapi/joi');

const { ticketIdSchema } = require('./tickets');
const { userIdSchema } = require('./users');

const userTicketIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserTicketSchema = {
  userId: userIdSchema,
  ticketId: ticketIdSchema
};

module.exports = {
  userTicketIdSchema,
  createUserTicketSchema
}