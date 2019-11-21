const joi = require('@hapi/joi');

const { userIdSchema } = require('./users');

const userNotificationIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const notificationSchema = joi.string();

const createUserNotificationSchema = {
  userId: userIdSchema,
  notification: notificationSchema,
};

module.exports = {
  userNotificationIdSchema,
  createUserNotificationSchema
}