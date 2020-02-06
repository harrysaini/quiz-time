import Joi from '@hapi/joi';

export const userSignupSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .alphanum()
    .required()
    .min(8),

  name: Joi.string()
    .required()

});


export const userLoginSchema = Joi.object({
  username: Joi.string()
    .required(),

  password: Joi.string()
    .required()

});
