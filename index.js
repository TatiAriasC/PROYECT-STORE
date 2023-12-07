// Crear un servidor básico de Express
require('dotenv').config();

const express = require('express');
const products = require('./src/routes/products.router');
const authRouter = require('./src/routes/authRouter');
const productsAdmon = require('./src/routes/products.admin');
const shoppingAdmon = require('./src/routes/shopping.admin');
const usersAdmon = require('./src/routes/users.admin');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'ejs');

// Permitir tráfico en formato JSON
app.use(require('cookie-parser')());

app.use(require('express-session')({
    secret: process.env.SESSION_SECRET || 'storeElena',
    resave: false,
    saveUninitialized: false
}));

require('./src/config/passport')(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index', {
        title: "Boutique ELENA",
        subtitle: "La mejor ropa a los mejores precios"
    });
});

// Rutas de autenticación y productos
app.use('/shopping-car', products);
app.use('/auth', authRouter);

// Rutas de productos
app.use('/admin/products', productsAdmon);
app.use('/admin/productsList', productsAdmon);
app.use('/admin/productsCreate', productsAdmon);

// Rutas de ventas
app.use('/admin/shopping', shoppingAdmon);
app.use('/admin/shoppingList', shoppingAdmon);

// Rutas de usuarios
app.use('/admin/users', usersAdmon);
app.use('/admin/usersList', usersAdmon);
app.use('/admin/usersCreate', usersAdmon);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
