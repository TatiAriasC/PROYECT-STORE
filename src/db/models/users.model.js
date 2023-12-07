const { DataTypes } = require('sequelize');

function defineUsers( sequelize ) {
    sequelize.define('user', {
        //Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        nombreCompleto:{
            type: DataTypes.STRING,
            allowNull: false
        },
        nombreUser: {
            type: DataTypes.STRING,
            allowNull: false
        },
        passwdUser:{
            type: DataTypes.STRING,
            allowNull: false
        }
    }, 
    
    {
        //Other model options go here
        timestamps: false
    });
}

module.exports = defineUsers;