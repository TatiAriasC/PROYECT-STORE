//Librerias externas
const express = require('express');
const router = express.Router()
const fs = require('fs');

//REQUIERE AUTENTICACIÓN DEL USUARIO
router.use((req, res, next)=>{
    if(req.user){
        next() 
    }
    else {
        console.log(req)
        req.session.returnTo = req.originalUrl; //Create session value with requested url
        res.redirect('/auth/signIn')
    } 
})

//Modulos internas
const {models} = require('../libs/sequelize');
const LOG_FILE_NAME = 'access_log.txt';

//WEB LISTAR PRODUCTOS DESDE SHOPPING CAR - ECOMMERCE
router.get('/', async (req, res) => {
    const data = await models.product.findAll();
    const filtro = req.query.filtro;
    const cart = req.session.cart || [];

    if (filtro) {
        // Filtrar registros por la clave y valor especificados en el query param
        const filtroMayusculas = filtro.toUpperCase();
        const registrosFiltrados = data.filter((registro) => {
            const RegistroMayusculas = registro.tipoProducto.toUpperCase();
            return RegistroMayusculas.includes(filtroMayusculas); // Cambia "tipo" al nombre de la clave que quieras filtrar
        });
        res.render('products/index', { products: registrosFiltrados, cart: cart});
      } else {
        // Si no se proporciona un valor para el query param, enviar todos los registros
        res.render('products/index', { products: data, cart: cart });
      }

    const currentTime = new Date().toISOString();
    const logEntry = `${currentTime} [GET] Listar productos desde ECOMMERCE  /shopping-car`;
    
    fs.appendFile(LOG_FILE_NAME, logEntry + '\n', (err) => {
        if (err) {
            console.error('Error al escribir en el archivo de registro.', err);
        }
    });
});

// Ruta para manejar la adición al carrito
router.post('/addToCart', (req, res) => {
    try {
        const productId = req.body.productId;
        const productName = req.body.productName;
        const productCode = req.body.productCode;
        const productTalla = req.body.productTalla;
        const productPrice = req.body.productPrice;
        const quantity = req.body.quantity;

        // Lógica para agregar al carrito (añadir al req.session.cart)
        req.session.cart = req.session.cart || [];
        const totalProduct = productPrice * quantity;
        req.session.cart.push({
            id: productId,
            name: productName,
            code: productCode,
            talla: productTalla,
            price: productPrice,
            quantity: quantity,
            totalproduct: totalProduct
        });

        res.redirect('/shopping-car'); // Redirige a donde sea apropiado después de agregar al carrito
    } catch (error) {
        console.error('Error al agregar al carrito:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta para manejar la eliminación de un artículo del carrito
router.post('/removeFromCart', (req, res) => {
    try {
        const productIdToRemove = req.body.productId;

        // Verifica si req.session.cart está definido y no es nulo
        if (req.session.cart) {
            // Encuentra el índice del producto en el array del carrito
            const indexToRemove = req.session.cart.findIndex(item => item.id === productIdToRemove);

            // Si se encuentra el índice, elimina el elemento del array
            if (indexToRemove !== -1) {
                req.session.cart.splice(indexToRemove, 1);
            }
        }

        res.redirect('/shopping-car'); // Redirige a donde sea apropiado después de eliminar del carrito
    } catch (error) {
        console.error('Error al eliminar del carrito:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta para confirmar la compra y realizar la inserción en la base de datos
router.post('/confirmPurchase', async (req, res) => {
    try {
        const userId = req.user.id; // Obtén el ID del usuario desde la sesión o donde sea necesario
        const cart = req.session.cart || [];

        // Inserta los elementos del carrito en la base de datos
        await Promise.all(cart.map(async (item) => {
            await models.shopping.create({
                productId: item.id,
                userId: userId,
                quantity: item.quantity,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }));

        // Limpia el carrito después de la compra
        req.session.cart = [];
        res.redirect('/'); // Puedes redirigir a donde quieras después de la compra
    } catch (error) {
        console.error('Error al confirmar la compra:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta para mostrar el mensaje de agradecimiento
router.get('/thankYou', (req, res) => {
    res.render('/shopping-car/thankYou');
});

module.exports = router;


