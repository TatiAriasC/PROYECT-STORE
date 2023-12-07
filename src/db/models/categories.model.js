const { DataTypes } = require('sequelize');

function defineCategories(sequelize) {
    sequelize.define('category', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            // references: {
            //     model: 'products.model', // Ajusta el nombre del modelo de productos según tu implementación
            //     key: 'id'
            // }
        }
        // Puedes agregar más campos según tus necesidades
    }, {
        timestamps: false
    });
}

module.exports = defineCategories;

