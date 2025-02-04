import Joi from "joi";

export const registerValidation = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});


export const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  

export const taskValidation = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(5).max(500).required(),
  completed: Joi.boolean().optional(),
});
