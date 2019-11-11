const joi = require('@hapi/joi');

const ticketIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const ticketDepartingSchema = joi.array();
const ticketReturningSchema = joi.array();
const ticketPriceSchema = joi.number().min(1);
const ticketQrSchema = joi.string().uri();
const ticketUserSchema = joi.array();


const createticketSchema = joi.object({
  departing: ticketDepartingSchema.required(),
  returning: ticketReturningSchema.required(),
  price: ticketPriceSchema.required(),
  qr: ticketQrSchema,
  user: ticketUserSchema
});

// Solo vamos a actualizar una parte de la pelicula
const updateticketSchema = joi.object({
  departing: ticketDepartingSchema,
  returning: ticketReturningSchema,
  price: ticketPriceSchema,
  qr: ticketQrSchema,
  user: ticketUserSchema
});

module.exports = {
  ticketIdSchema,
  createticketSchema,
  updateticketSchema
}