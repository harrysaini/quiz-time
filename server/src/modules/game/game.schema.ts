import Joi from '@hapi/joi';

export const startNewGameRequestSchema = Joi.object({
  topicId: Joi.string()
    .required(),

  userId: Joi.string()
    .required(),

  isMultiplayer: Joi.boolean()
    .required()

});

