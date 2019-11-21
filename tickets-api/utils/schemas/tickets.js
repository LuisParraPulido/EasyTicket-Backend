const joi = require('@hapi/joi');

const ticketIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const ticketPriceSchema = joi.number().min(1);
const ticketQrSchema = joi.array();

const ticketDepartingReturningSchema = joi.object({
  date: joi.string().required(),
  hour: joi.string().required(),
  from: joi.string().required(),
  to: joi.string().required(),
  arrive: joi.string().required(),
  stops: joi.number().required(),
  travelTime: joi.string().required()
});

const ticketUserSchema = joi.object({
  name: joi.string().required(),
  lastname: joi.string().required(),
  country: joi.string().required(),
  document: joi.string().required(),
  birthday: joi.string().required()
});

const createticketSchema = joi.object({
  departing: ticketDepartingReturningSchema.required(),
  returning: ticketDepartingReturningSchema.required(),
  price: ticketPriceSchema.required(),
  qr: ticketQrSchema,
  user: ticketUserSchema
});

// Solo vamos a actualizar una parte de la pelicula
const updateticketSchema = joi.object({
  departing: ticketDepartingReturningSchema,
  returning: ticketDepartingReturningSchema,
  price: ticketPriceSchema,
  qr: ticketQrSchema,
  user: ticketUserSchema
});

module.exports = {
  ticketIdSchema,
  createticketSchema,
  updateticketSchema
}