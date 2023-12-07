const { DataTypes } = require('sequelize');

function defineShopping(sequelize) {
    sequelize.define('shopping', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: {
            //     model: 'products.model', // Ajusta el nombre del modelo de productos según tu implementación
            //     key: 'id'
            // }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: {
            //     model: 'users.model', // Ajusta el nombre del modelo de usuarios según tu implementación
            //     key: 'id'
            // }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
        // Puedes agregar más campos según tus necesidades
    }, {
        timestamps: true,
        createdAt: 'createdAt', // Nombre personalizado para la columna createdAt
        updatedAt: 'updatedAt'  // Nombre personalizado para la columna updatedAt
    });
}

module.exports = defineShopping;

