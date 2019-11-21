const joi = require('@hapi/joi');

const searchFrom = joi.string();
const searchTo = joi.string();
const searchDeparture = joi.string();
const searchReturningDate = joi.string();

const createSearchSchema = joi.object({
  from: searchFrom.required(),
  to: searchTo.required(),
  departure: searchDeparture.required(),
  returningDate: searchReturningDate.required()
})

module.exports = {
  createSearchSchema
}