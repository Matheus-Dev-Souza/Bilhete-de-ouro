// src/validators/game.validator.ts
import Joi from 'joi';

export const spinSchema = Joi.object({
  bet: Joi.number()
    .min(GAME_CONFIG.MIN_BET)
    .max(GAME_CONFIG.MAX_BET)
    .required(),
  externalUserId: Joi.string().required(),
  gameId: Joi.string().length(12).required(),
  partnerId: Joi.string().required()
});