import Joi from "joi";

export const registerSchema = Joi.object({
        username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    name: Joi.string().required(),    

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirm_password: Joi.ref('password'),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})