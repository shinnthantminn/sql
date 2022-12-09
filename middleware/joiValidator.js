const joi = require("joi");

module.exports = {
  product: {
    body: {
      add: joi.object({
        name: joi.string().required(),
        count: joi.number().required(),
        userId: joi.optional(),
      }),
    },
  },
  user: {
    body: joi.object({
      email: joi.string().required(),
      password: joi.string().required(),
      username: joi.string().required(),
    }),
    login: joi.object({
      email: joi.string().required(),
      password: joi.string().required(),
    }),
  },
};
