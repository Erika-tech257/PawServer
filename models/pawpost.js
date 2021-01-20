const database = require('../db')
const User = require('../db').import('./user')

module.exports = (sequelize, DataTypes) => {
    const PawPost = sequelize.define('pawpost', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        animal: {
            type: DataTypes.STRING,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    PawPost.belongsTo(User, {as: 'newPost', foreignKey:"owner"});

    return PawPost;
}