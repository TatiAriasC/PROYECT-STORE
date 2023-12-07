//Librerias externas
const express = require('express');
const router = express.Router()
const fs = require('fs');
const PDFDocument = require('pdfkit');

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

//PDF FICHA DEL PRODUCTO
router.get('/productsList/generate-pdf/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Obtener datos del producto con el ID especificado
        const product = await models.product.findByPk(id);

        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }

        // Crear un nuevo documento PDF
        const doc = new PDFDocument();

        // Configurar el estilo del documento PDF
        doc.font('Helvetica-Bold');
        doc.fontSize(20).text(`Detalles del Producto #${id}`, { align: 'center' });
        doc.moveDown();

        doc.font('Helvetica');
        // Agregar datos del producto al PDF
        doc.fontSize(14).text(`Código: ${product.codigoProducto}`);
        doc.moveDown();
        doc.fontSize(14).text(`Nombre: ${product.nombreProducto}`);
        doc.moveDown();

        // Manejar descripción larga con saltos de línea automáticos
        doc.fontSize(14).text('Descripción:', { continued: true }).font('Helvetica-Oblique');
        doc.text(product.descripcionProducto, { align: 'left', width: 500 });
        doc.font('Helvetica').moveDown();

        doc.fontSize(14).text(`Tipo: ${product.tipoProducto}`);
        doc.moveDown();
        doc.fontSize(14).text(`Marca: ${product.marcaProducto}`);
        doc.moveDown();
        doc.fontSize(14).text(`Talla: ${product.tallaProducto}`);
        doc.moveDown();
        doc.fontSize(14).text(`Precio: ${product.precioProducto}`);
        doc.moveDown();
        doc.fontSize(14).text(`Proveedor: ${product.proveedor}`);
        doc.moveDown();

        // Formatear la fecha usando toLocaleDateString
        const formattedDate = product.fechaIngreso.toLocaleDateString();
        doc.fontSize(14).text(`Fecha de Ingreso: ${formattedDate}`);
        doc.moveDown();

        // Manejar la imagen
        doc.fontSize(14).text('Foto:', { continued: true });

        // Verificar si product.foto está definido y es una cadena no vacía
        if (product.foto && typeof product.foto === 'string' && product.foto.trim() !== '') {
            doc.image(product.foto, { width: 100, height: 100 });
        } else {
            doc.text('No disponible');
        }

        doc.moveDown();

        // Añadir un espacio en blanco al final del documento
        doc.moveDown();

        // Agregar una línea de separación
        doc.lineCap('butt').moveTo(50, doc.y).lineTo(550, doc.y).stroke();

        // Finalizar el documento PDF
        doc.pipe(res);
        doc.end();
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        res.status(500).send('Error interno del servidor al generar el PDF.');
    }
});


//WEB LISTAR PRODUCTOS DESDE EL DASHBOARD
router.get('/productsList', async (req, res) => {
    const data = await models.product.findAll();
    const filtro = req.query.filtro;

    if (filtro) {
        // Filtrar registros por la clave y valor especificados en el query param
        const filtroMayusculas = filtro.toUpperCase();
        const registrosFiltrados = data.filter((registro) => {
            const RegistroMayusculas = registro.nombreProducto.toUpperCase();
            return RegistroMayusculas.includes(filtroMayusculas); // Cambia "tipo" al nombre de la clave que quieras filtrar
        });
        res.render('admin/products/productsList', { products: registrosFiltrados });
      } else {
        // Si no se proporciona un valor para el query param, enviar todos los registros
        res.render('admin/products/productsList', { products: data });
      }

    const currentTime = new Date().toISOString();
    const logEntry = `${currentTime} [GET] Listar productos desde DASHBOARD  /admin/products/productsList`;
    
    fs.appendFile(LOG_FILE_NAME, logEntry + '\n', (err) => {
        if (err) {
            console.error('Error al escribir en el archivo de registro.', err);
        }
    });
});

//WEB CREAR PRODUCTOS DESDE EL DASHBOARD
router.get('/productsCreate', (req,res) =>{
    //Mostrar el formulario
    res.render('admin/products/productsCreate');
})

router.post('/', async (req,res) =>{
    try{
        const newProduct = await models.product.create(req.body)
        res.redirect('/admin/products/productsList')
    } catch (error){
            console.error(error);
            res.json({message: ' Error al almacenar el producto'});
        }

        const currentTime = new Date().toISOString();
        const logEntry = `${currentTime} [POST] Crear productos desde DASHBOARD  /admin/products/productsCreate`;
        
        fs.appendFile(LOG_FILE_NAME, logEntry + '\n', (err) => {
            if (err) {
                console.error('Error al escribir en el archivo de registro.', err);
            }
        });
});


//WEB ELIMINAR PRODUCTOS DESDE EL DASHBOARD
router.post('/productsList/Delete/:id', async (req, res) => {
    try {
        //GUARDAR ID
        const id = req.params.id;
        // BUSCAR EL CARRO CON EL ID QUE RECIBE Y ELIMINARLO
        await models.product.destroy({
            where: {
                id: id
            }
        });

        // Redirigir después de completar la eliminación
        res.redirect('/admin/products/productsList');

        const currentTime = new Date().toISOString();
        const logEntry = `${currentTime} [DELETE] Eliminar productos desde DASHBOARD  /admin/products/Delete/id: `;
        
        fs.appendFile(LOG_FILE_NAME, logEntry + id + '\n', (err) => {
            if (err) {
                console.error('Error al escribir en el archivo de registro.', err);
            }
        });
        
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).send('Error interno del servidor al eliminar el carro.');
    }
});

module.exports = router;