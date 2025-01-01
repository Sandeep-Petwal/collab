const { Sequelize } = require('sequelize')

const config = {
    database: process.env.DATABASE,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
}

const sequelize = new Sequelize(config);

// authenticate promise
sequelize.authenticate()
    .then(() => console.log("DB Authenticated ✅"))
    .catch((err) => console.log("Error while authenticating the database !" + err))




module.exports = sequelize;