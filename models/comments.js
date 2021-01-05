const  PawPost  = require('../db').import('./pawpost')
const  User = require('../db').import('./user')
const database = require('../db')
module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('comments', {
        description: {
            type:DataTypes.STRING,
            allowNull: false
        }
    })
    Comments.belongsTo(User, {as: 'reply'});
    Comments.belongsTo(PawPost, {as:'PawPost'})
  
    return Comments;
}

