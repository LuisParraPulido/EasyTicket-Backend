const boom = require('@hapi/boom');
// eslint-disable-next-line no-unused-vars
const joi = require('@hapi/joi');

function validate(data, schema) {
  // const joiSchema = joi.object(schema)
  // const { error } = joiSchema.validate(data);//ajuste joi version 16.1.7

  const { error } = schema.validate(data); //valida correctamente created
  // const { error } = schema.validate(data, { errors: { stack: true } });
  // const { error } = joi.object(schema).validate(data);
  
  return error;
}

function validationHandler(schema, check = 'body') {
  return function(req, res, next) {
    const error = validate(req[check], schema);

    error ? next(boom.badRequest(error)) : next();
  }
}

module.exports = validationHandler;