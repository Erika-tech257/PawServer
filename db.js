const Sequelize = require('sequelize'); 

const database = new Sequelize(process.env.NAME, 'postgres',process.env.PASS, {
    host: 'localhost',
    dialect: 'postgres'
});


database.authenticate().then(
    function() {
        console.log('connected to postgres database')
    },
    function(err){
        console.log(err);
    }
)

module.exports = database; 

