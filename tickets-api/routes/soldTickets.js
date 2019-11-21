const express = require('express');
const SoldTicketsService = require('../services/soldTickets');
const joi = require('@hapi/joi');

const {
  ticketIdSchema,
  createticketSchema,
  updateticketSchema
} = require('../utils/schemas/tickets');

const validationHandler = require('../utils/middleware/validationHandler');

function resoldTicketsApi(app) {
  const router = express.Router();
  app.use('/api/resoldTickets', router);

  const soldTicketsService = new SoldTicketsService();

  router.get('/',
    async function(req, res, next) {
    //con que lo voy a filtrar
    try {
      const tickets = await soldTicketsService.getTickets()

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
    // validationHandler(joi.object({ ticketId: ticketIdSchema }), 'params'), 
    async function(req, res, next) {
    const { ticketId } = req.params
    try {
      const tickets = await soldTicketsService.getTicket({ ticketId })

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
    // validationHandler(createticketSchema), 
    async function(req, res, next) {
    const { body: ticket } = req
    try {
      const createdTicketId = await soldTicketsService.createTicket({ ticket })

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
    // validationHandler(joi.object({ ticketId: ticketIdSchema }), 'params'), 
    // validationHandler(updateticketSchema), 
    async function(req, res, next) {
    const { ticketId } = req.params;
    const { body: ticket } = req;
    try {
      const updatedTicketId = await soldTicketsService.updateTicket({ ticketId, ticket })

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
    // validationHandler(joi.object({ ticketId: ticketIdSchema }), 'params'),
    async function(req, res, next) {
    const { ticketId } = req.params;
    try {
      const deletedTicketId = await soldTicketsService.deleteTicket({ ticketId })

      res.status(200).json({
        data: deletedTicketId,
        message: 'ticket deleted'
      })
    } catch (err) {
      next(err);
    }
  });







}

module.exports = resoldTicketsApi;