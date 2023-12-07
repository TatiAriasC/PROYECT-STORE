const { DataTypes } = require('sequelize');

function defineProducts( sequelize ) {
    sequelize.define('product', {
        //Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        codigoProducto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nombreProducto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcionProducto: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tipoProducto:{
            type: DataTypes.STRING,
            allowNull: false
        },
        marcaProducto:{
            type: DataTypes.STRING,
            allowNull: false
        },
        tallaProducto:{
            type: DataTypes.STRING,
            allowNull: false
        },
        precioProducto:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        proveedor:{
            type: DataTypes.STRING,
            allowNull: false
        },
        fechaIngreso:{
            type: DataTypes.DATE,
            allowNull: false
        },
        fotoProducto:{
            type: DataTypes.STRING,
            allowNull: true
        }
    }, 
    
    {
        //Other model options go here
        timestamps: false
    });
}

module.exports = defineProducts;