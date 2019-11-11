const express = require('express');
const passport = require('passport');
const TicketsService = require('../services/tickets');
const joi = require('@hapi/joi');

const {
  ticketIdSchema,
  createticketSchema,
  updateticketSchema
} = require('../utils/schemas/tickets');

const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

//JWT strategy
require('../utils/auth/strategies/jwt');

function ticketsApi(app) {
  const router = express.Router();
  app.use('/api/tickets', router);

  const ticketsService = new TicketsService();

  router.get('/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:tickets']),
    async function(req, res, next) {
    //con que lo voy a filtrar
    const { departing } = req.query;
    try {
      const tickets = await ticketsService.getTickets({ departing })

      res.status(200).json({
        data: tickets,
        message: 'tickets listed'
      })
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/:ticketId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:tickets']),
    validationHandler(joi.object({ ticketId: ticketIdSchema }), 'params'), 
    async function(req, res, next) {
    const { ticketId } = req.params
    try {
      const tickets = await ticketsService.getTicket({ ticketId })

      res.status(200).json({
        data: tickets,
        message: 'ticket listed'
      })
    } catch (err) {
      next(err);
    }
  });

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:tickets']),
    validationHandler(createticketSchema), 
    async function(req, res, next) {
    const { body: ticket } = req
    try {
      const createdTicketId = await ticketsService.createTicket({ ticket })

      res.status(201).json({
        data: createdTicketId,
        message: 'ticket created'
      })
    } catch (err) {
      next(err);
    }
  });

  router.put(
    '/:ticketId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:tickets']),
    validationHandler(joi.object({ ticketId: ticketIdSchema }), 'params'), 
    validationHandler(updateticketSchema), 
    async function(req, res, next) {
    const { ticketId } = req.params;
    const { body: ticket } = req;
    try {
      const updatedTicketId = await ticketsService.updateTicket({ ticketId, ticket })

      res.status(200).json({
        data: updatedTicketId,
        message: 'ticket updated'
      })
    } catch (err) {
      next(err);
    }
  });

  router.delete(
    '/:ticketId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:tickets']),
    validationHandler(joi.object({ ticketId: ticketIdSchema }), 'params'),
    async function(req, res, next) {
    const { ticketId } = req.params;
    try {
      const deletedTicketId = await ticketsService.deleteTicket({ ticketId })

      res.status(200).json({
        data: deletedTicketId,
        message: 'ticket deleted'
      })
    } catch (err) {
      next(err);
    }
  });







}

module.exports = ticketsApi;