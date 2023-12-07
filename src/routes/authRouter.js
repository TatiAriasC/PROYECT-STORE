const express= require ('express')
const passport = require ('passport')
const authRouter = express.Router()
const {models} = require('../libs/sequelize')

authRouter.route('/signIn')
.get((req, res) => {
    res.render('auth/signIn')
})

.post(
    passport.authenticate('local', {
        successReturnToOrRedirect: '/admin/products/productsList', //auth/profile',
        failureRedirect: '/',
        keepSessionInfo: true
    })
)

authRouter.route('/signUp')
.get((req, res) => {
    res.render('auth/signUp')
})

.post(async (req, res) => {
    const user = await models.user.create(req.body)
    req.login(user, () => {
        //res.redirect('/auth/profile');
        res.render('auth/signIn')
    });
})

//CERRAR LA SESSION DE USUARIO LOGOUT
authRouter.route('/logout')
  .get((req, res) => {
    req.logout(err => {
      if (err) {
        return next(err);
      }
      res.redirect('/');  // Redirecciona a la página principal u otra página después del cierre de sesión
    });
  });

authRouter.route('/profile').get((req, res) => {
    res.json(req.user)
})

module.exports = authRouter