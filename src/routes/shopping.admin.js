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

//PDF ORDEN DE VENTA
router.get('/shoppingList/generate-pdf/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Obtener datos de la venta con el ID especificado
        const shopping = await models.shopping.findByPk(id);

        if (!shopping) {
            return res.status(404).send('Registro de venta no encontrado');
        }

        // Crear un nuevo documento PDF
        const doc = new PDFDocument();

        // Configurar el estilo del documento PDF
        doc.font('Helvetica-Bold');
        doc.fontSize(20).text(`Detalles de la orden de venta #${id}`, { align: 'center' });
        doc.moveDown();

        doc.font('Helvetica');
        // Agregar datos de la orden de venta al PDF
        doc.fontSize(14).text(`ID Producto: ${shopping.productId}`);
        doc.moveDown();
        doc.fontSize(14).text(`ID Usuario: ${shopping.userId}`);
        doc.moveDown();
        doc.fontSize(14).text(`Cantidad: ${shopping.quantity}`);
        doc.moveDown();

        // Formatear la fecha usando toLocaleDateString
        const formattedDate = shopping.createdAt.toLocaleDateString();
        doc.fontSize(14).text(`Fecha de Venta: ${formattedDate}`);
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


//WEB LISTAR VENTAS DESDE EL DASHBOARD
router.get('/shoppingList', async (req, res) => {
    const data = await models.shopping.findAll();

    res.render('admin/shopping/shoppingList', { shoppinges: data });

    const currentTime = new Date().toISOString();
    const logEntry = `${currentTime} [GET] Listar ventas desde DASHBOARD  /admin/shopping/shoppingList`;
    
    fs.appendFile(LOG_FILE_NAME, logEntry + '\n', (err) => {
        if (err) {
            console.error('Error al escribir en el archivo de registro.', err);
        }
    });
});

//WEB ELIMINAR VENTAS DESDE EL DASHBOARD
router.post('/shoppingList/Delete/:id', async (req, res) => {
    try {
        //GUARDAR ID
        const id = req.params.id;
        // BUSCAR EL CARRO CON EL ID QUE RECIBE Y ELIMINARLO
        await models.shopping.destroy({
            where: {
                id: id
            }
        });

        // Redirigir después de completar la eliminación
        res.redirect('/admin/shopping/shoppingList');

        const currentTime = new Date().toISOString();
        const logEntry = `${currentTime} [DELETE] Eliminar ventas desde DASHBOARD  /admin/shopping/Delete/id: `;
        
        fs.appendFile(LOG_FILE_NAME, logEntry + id + '\n', (err) => {
            if (err) {
                console.error('Error al escribir en el archivo de registro.', err);
            }
        });
        
    } catch (error) {
        console.error('Error al eliminar el registro de venta:', error);
        res.status(500).send('Error interno del servidor al eliminar el registro.');
    }
});

module.exports = router;