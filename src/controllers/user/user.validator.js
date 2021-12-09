const Joi = require('joi');

export const register = {
  body: Joi.object({
    name: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    nik: Joi.string().required(),
  }),
};
