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

//WEB LISTAR USUARIOS DESDE EL DASHBOARD
router.get('/usersList', async (req, res) => {
    const data = await models.user.findAll();
    const filtro = req.query.filtro;

    if (filtro) {
        // Filtrar registros por la clave y valor especificados en el query param
        const filtroMayusculas = filtro.toUpperCase();
        const registrosFiltrados = data.filter((registro) => {
            const RegistroMayusculas = registro.nombreCompleto.toUpperCase();
            return RegistroMayusculas.includes(filtroMayusculas); // Cambia "tipo" al nombre de la clave que quieras filtrar
        });
        res.render('admin/users/usersList', { users: registrosFiltrados });
      } else {
        // Si no se proporciona un valor para el query param, enviar todos los registros
        res.render('admin/users/usersList', { users: data });
      }

    const currentTime = new Date().toISOString();
    const logEntry = `${currentTime} [GET] Listar productos desde DASHBOARD  /admin/users/usersList`;
    
    fs.appendFile(LOG_FILE_NAME, logEntry + '\n', (err) => {
        if (err) {
            console.error('Error al escribir en el archivo de registro.', err);
        }
    });
});


//WEB CREAR USUARIO DESDE EL DASHBOARD
router.get('/usersCreate', (req,res) =>{
    //Mostrar el formulario
    res.render('admin/users/usersCreate');
})

router.post('/', async (req,res) =>{
    try{
        const newUser = await models.user.create(req.body)
        res.redirect('/admin/users/usersList')
    } catch (error){
            console.error(error);
            res.json({message: ' Error al almacenar el producto'});
        }

        const currentTime = new Date().toISOString();
        const logEntry = `${currentTime} [POST] Crear usuario desde DASHBOARD  /admin/users/usersCreate`;
        
        fs.appendFile(LOG_FILE_NAME, logEntry + '\n', (err) => {
            if (err) {
                console.error('Error al escribir en el archivo de registro.', err);
            }
        });
});


//WEB ELIMINAR USUARIO DESDE EL DASHBOARD
router.post('/usersList/Delete/:id', async (req, res) => {
    try {
        //GUARDAR ID
        const id = req.params.id;
        // BUSCAR EL CARRO CON EL ID QUE RECIBE Y ELIMINARLO
        await models.user.destroy({
            where: {
                id: id
            }
        });

        // Redirigir después de completar la eliminación
        res.redirect('/admin/users/usersList');

        const currentTime = new Date().toISOString();
        const logEntry = `${currentTime} [DELETE] Eliminar usuario desde DASHBOARD  /admin/users/Delete/id: `;
        
        fs.appendFile(LOG_FILE_NAME, logEntry + id + '\n', (err) => {
            if (err) {
                console.error('Error al escribir en el archivo de registro.', err);
            }
        });
        
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).send('Error interno del servidor al eliminar el carro.');
    }
});

module.exports = router;