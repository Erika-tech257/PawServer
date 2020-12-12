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
        firstName: {
            type:DataTypes.STRING,
            allownull: false
        },
        lastName: {
            type:DataTypes.STRING,
            allowNull: true
        },
        displayName: {
            type:DataTypes.STRING,
            allownull: false
        },
        location: {
            type:DataTypes.STRING,
            allowNull: false
        }
    })
    return User;
}