const database = require("../db");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false, 
            unique: true
        },
        password: {
            type:DataTypes.STRING,
            allowNull: false
        },
        userName: {
            type:DataTypes.STRING,
            aallowNull: false
        }
   
    })
    
    return User;
}