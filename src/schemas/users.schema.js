const Joi = require('joi');

const id = Joi.number()
const nombreCompleto = Joi.string().min(5).max(50)
const nombreUser = Joi.string().min(5).max(30)
const passwdUser = Joi.string().min(2).max(30)

const createUserSchema = Joi.object({
    nombreCompleto: nombreCompleto.required(),
    nombreUser: nombreUser.required(),
    passwdUser: passwdUser.required()
});

const updateUserSchema = Joi.object({
    nombreCompleto: nombreCompleto.required(),
    nombreUser: nombreUser.required(),
    passwdUser: passwdUser.required()
});

const getUserSchema = Joi.object({
    id: id.required()
});

module.exports = {
    createUserSchema,
    updateUserSchema,
    getUserSchema
}