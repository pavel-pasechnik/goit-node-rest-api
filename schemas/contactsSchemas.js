import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string()
    .pattern(new RegExp(`^[+]?[(]?[0-9]{1,3}[)]?[- ]?[0-9]{1,3}[- ]?[0-9]{1,6}$`))
    .required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string().pattern(new RegExp(`^[+]?[(]?[0-9]{1,3}[)]?[- ]?[0-9]{1,3}[- ]?[0-9]{1,6}$`)),
});
