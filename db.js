const Sequelize = require('sequelize');

const database = new Sequelize(process.env.DATABASE_URL || `postgresql://postgres:${encodeURIComponent(process.env.PASS)}@localhost/paws`,
    {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false, // <<<<<<< YOU NEED THIS TO FIX UNHANDLED REJECTION 
            },
          },
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

