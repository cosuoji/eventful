import Joi from "joi";

export const registerSchema = Joi.object({
    name: Joi.string().required(),    
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    password_confirmation: Joi.ref('password'),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
    
}).with('password', 'password_confirmation');

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const resetSchema = Joi.object({
  email: Joi.string().email().required()
})

export const passwordSchema = Joi.object({
  userId: Joi.string(),
  token: Joi.string(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

export const eventSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  ticketsAvailable: Joi.number().required(),
  date: Joi.date().required()
})