const Sequelize = require('sequelize');

const database = new Sequelize(process.env.DATABASE_URL || `postgresql://postgres
:${encodeURIComponent(process.env.PASS)}@localhost/PawServer`,
    {
        dialect: 'postgres'
    });


database.authenticate().then(
    function () {
        console.log('connected to postgres database')
    },
    function (err) {
        console.log(err);
    }
)

module.exports = database;

