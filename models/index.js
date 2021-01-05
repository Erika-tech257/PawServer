const User = require('./user')
const PawPost = require('./pawpost')
const Comments = require('./comments')

// // one to one db relation
// User.hasOne(PawPost, { as : 'newBlog'})
// PawPost.belongsTo(User, { as: 'newBlog'})

// // one to many db relation
// User.hasMany(Comments)
// Comments.belongsTo(User)

module.exports = {
    User,
    PawPost,
    Comments
}