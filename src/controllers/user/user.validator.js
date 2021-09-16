const Joi = require('joi');

// export const getOtherUserProfile = {
//   body: {
//     userId: Joi.number().required(),
//   },
// };

// export const changePassword = {
//   body: {
//     oldPassword: Joi.string().required(),
//     newPassword: Joi.string().required(),
//   },
// };

export const register = {
  body: Joi.object({
    name: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    nik: Joi.string().required(),
  }),
};

// export const login = {
//   body: Joi.object({
//     // email: Joi.string()
//     //   .email()
//     //   .required(),
//     // password: Joi.string().required(),
//     // token: Joi.string().required()
//   }),
// };
