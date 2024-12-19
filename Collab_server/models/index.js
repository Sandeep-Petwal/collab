const users = require("./users.js")
const collaborators = require("./collaborators.js")
const documents = require("./documents.js");
const sessions = require("./sessions.js");
const sequelize = require("../config/database.js")

// user and document association
users.hasMany(documents, { foreignKey: "user_id", as: "documents" });
documents.belongsTo(users, { foreignKey: "user_id", as: "user" });

// collaborator and document association
collaborators.belongsTo(documents, { foreignKey: "document_id", as: "document" });
documents.hasMany(collaborators, { foreignKey: "document_id", as: "collaborators" });



// sequelize.sync({ alter: true })
//     .then(() => console.log("Models synced successfully!"))
//     .catch((error) => console.error("Error syncing models:", error))





module.exports = { users, collaborators, documents, sessions, sequelize }