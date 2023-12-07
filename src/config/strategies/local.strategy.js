const passport = require('passport')
const LocalStrategy = require('passport-local')
const {models} = require('../../libs/sequelize')

async function getUserByUsername( nombreUser ) {
    const user = await models.user.findAll({
        where: {
            nombreUser: nombreUser
        }
    })
    
    return user[0].dataValues
}

passport.use(new LocalStrategy(
    async function(nombreUser, passwdUser, done) {
        //1. Consultar en BD el usuario
        const user = await getUserByUsername(nombreUser)
        console.log(user)
        //2. Comparar la contraseña
        if(user && user.passwdUser == passwdUser){
            //3. Decidir si queda logueado o no
            //SI
            return done(null, user)
        }
        //NO
        return done(null, false)
    }
));