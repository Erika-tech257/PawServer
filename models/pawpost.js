module.exports = (sequelize, DataTypes) => {
    const pawpost = sequelize.define('pawpost', {
        title: {
            type: DataTypes.STRING,
            allownull: false
        },
        animal: {
            type: DataTypes.STRING,
            allownull: false
        },
        color: {
            type: DataTypes.STRING,
            allownull: false
        },
        city: {
            type: DataTypes.STRING,
            allownull: false
        },
        state: {
            type: DataTypes.STRING,
            allownull: false
        },
        description: {
            type: DataTypes.STRING,
            allownull: false
        },
        date: {
            type: DataTypes.STRING,
            allownull: false
        },
        time: {
            type: DataTypes.STRING,
            allownull: false
        },
        owner: {
            type: DataTypes.INTEGER
        }
    
    })
    return pawpost;
};