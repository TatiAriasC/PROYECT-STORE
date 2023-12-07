const defineProducts = require("./products.model");
const defineUsers = require("./users.model");
const defineShopping = require('./shopping.model');
const defineCategories = require('./categories.model');

function defineModels( sequelize ){
    defineProducts(sequelize);
    defineUsers(sequelize);
    defineShopping(sequelize);
    defineCategories(sequelize);
    //Other models go here
}

module.exports = defineModels