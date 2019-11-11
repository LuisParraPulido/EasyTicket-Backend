const express = require('express');
const passport = require('passport');

const UserTicketsService = require('../services/userTickets');
const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');


const { ticketIdSchema } = require('../utils/schemas/tickets');
const { userIdSchema } = require('../utils/schemas/users');
const { createUserTicketSchema } = require('../utils/schemas/userTickets');

//JWT strategy
require('../utils/auth/strategies/jwt');

function userTicketsApi(app) {
  const router = express.Router();
  app.use('/api/user-tickets', router);

  const userTicketsService = new UserTicketsService();

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:user-tickets']),
    validationHandler({ useId: userIdSchema }, 'query'),
    async function(req, res, next) {
    const { userId } = req.query;

    try {
      const userTickets = await userTicketsService.getUsertickets({ userId });

      res.status(200).json({
        data: userTickets,
        message: 'user tickets listed'
      })
    } catch (error) {
        next(error)
    }
  });

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:user-tickets']),
    validationHandler(createUserTicketSchema),
    async function(req, res, next) {
    const { body: userTicket } = req;

    try {
      const createdUserTicketId = await userTicketsService.createUserTicket({
        userTicket
      });

      res.status(201).json({
        data:createdUserTicketId,
        message: 'user ticket created'
      })
    } catch (error) {
        next(error)
    }
  })

  router.delete(
    '/:userTicketId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:user-tickets']),
    validationHandler({ userTicketId: ticketIdSchema }, 'params'),
    async function(req, res, next) {
    const { userTicketId } = req.params;

    try {
      const deletedUserTicketId = await userTicketsService.deleteUseTicket({
        userTicketId
      });

      res.status(200).json({
        data:deletedUserTicketId,
        message: 'user ticket deleted'
      })
    } catch (error) {
        next(error)
    }
  })

}

module.exports = userTicketsApi;
