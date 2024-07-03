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

export const newPasswordSchema = Joi.object({
  password: Joi.string().required(),
})