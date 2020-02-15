const Joi = require('@hapi/joi');

const registrationSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(255)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .required()
});

const loginSchema = Joi.object({
  login: Joi.string()
    .min(3)
    .max(255)
    .required(),
  username: Joi.string()
    .min(3)
    .max(255),
  email: Joi.string()
    .email(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .required()
});

const Validate = schema => data => schema.validate(data);

module.exports.registerValidation = Validate(registrationSchema);
module.exports.loginValidation = Validate(loginSchema);