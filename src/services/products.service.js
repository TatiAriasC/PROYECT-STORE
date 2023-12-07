const {models} = require('../libs/sequelize')

//Funcion para listar todos los productos de ropa
async function index() {
    const listProduct = await models.products.findAll();
    return listProduct;
}

//Funcion para crear un nuevo producto de ropa
async function store(body) {
    const crearProduct = await models.products.create(body);
    return crearProduct;
}

//Funcion para mostrar un solo producto de ropa
async function show(id) {
    const listProductId = await models.products.findByPk(id);
    return listProductId;
}

//Funcion para actualizar un producto de ropa
async function update(id, body) {
    const [affectedRows, [updatedProduct]] = await models.products.update(body, {
        where: {
            id
        },
        returning: true
    });
    return updatedProduct;
}

//Funcion para eliminar un producto de ropa
async function destroy(id) {
    const productId = await models.products.findByPk(id);
    const deletedProduct = await models.products.destroy({
        where: {
            id
        },
        returning: true
    });
    if(deletedProduct){
        return productId;
    }
    return null;
}

//Exportar las funciones del controlador
module.exports = {
    index,
    store,
    show,
    update,
    destroy
}