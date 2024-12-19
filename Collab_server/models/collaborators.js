const sequelize = require("../config/database.js")
const { DataTypes } = require('sequelize');



const collaborators = sequelize.define("collaborators", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull : false
    },
    document_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM("owner", "editor", "viewer"),
        defaultValue: "viewer",
    },
    status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending",
    }
}, {
    timestamps : true
});


module.exports = collaborators