const Joi = require('joi');

const id = Joi.number()
const codigoProducto = Joi.string().min(5).max(50)
const nombreProducto = Joi.string().min(5).max(50)
const descripcionProducto = Joi.string().min(5).max(500)
const tipoProducto = Joi.string().min(2).max(20)
const marcaProducto = Joi.string().min(2).max(30)
const tallaProducto = Joi.string().min(2).max(10)
const precioProducto = Joi.number()
const proveedor = Joi.string().min(5).max(50)
const fechaIngreso = Joi.date()
const fotoProducto = Joi.string().min(2).max(900)

const createProductsSchema = Joi.object({
    codigoProducto: codigoProducto.required(),
    nombreProducto: nombreProducto.required(),
    descripcionProducto: descripcionProducto.optional(),
    tipoProducto: tipoProducto.required(),
    marcaProducto: marcaProducto.required(),
    tallaProducto: tallaProducto.required(),
    precioProducto: precioProducto.required(),
    proveedor: proveedor.required(),
    fechaIngreso: fechaIngreso.required(),
    fotoProducto: fotoProducto.optional()
});

const updateProductsSchema = Joi.object({
    codigoProducto: codigoProducto.required(),
    nombreProducto: nombreProducto.required(),
    descripcionProducto: descripcionProducto.optional(),
    tipoProducto: tipoProducto.required(),
    marcaProducto: marcaProducto.required(),
    tallaProducto: tallaProducto.required(),
    precioProducto: precioProducto.required(),
    proveedor: proveedor.required(),
    fechaIngreso: fechaIngreso.required(),
    fotoProducto: fotoProducto.optional()
});

const getProductsSchema = Joi.object({
    id: id.required()
});

module.exports = {
    createProductsSchema,
    updateProductsSchema,
    getProductsSchema
}