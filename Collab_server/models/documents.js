const sequelize = require("../config/database")
const { DataTypes } = require('sequelize');


const documents = sequelize.define("documents", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        defaultValue : " "
    },
});



module.exports = documents;