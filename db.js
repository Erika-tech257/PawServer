const Sequelize = require('sequelize');

const database = new Sequelize(process.env.DATABASE_URL,
    {
        dialect: 'postgres',
        dialectOptions: process.env.DATABASE_URL.includes("localhost")? {}: {
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

