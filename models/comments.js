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
    // foreignKey: 'owner'
    Comments.belongsTo(User, {as: 'reply', foreignKey:'owner'});
    Comments.belongsTo(PawPost, {as:'PawPost'})  //In PG Admin it is PawPostId
  
    return Comments;
}

