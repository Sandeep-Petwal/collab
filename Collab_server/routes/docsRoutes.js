const express = require('express');
const docsRoutes = express.Router();
const { getAllDocuments, createDocument, getDocument, editDocument } = require("../controllers/docsController");



// get all documetnt of user by user(id) with pagination
docsRoutes.get("/documents/all", getAllDocuments);

// create a new document
docsRoutes.post("/create", createDocument);

// get a document by id
docsRoutes.get("/get/:id", getDocument);

// update/edit
docsRoutes.put("/update/:id",editDocument)

module.exports = docsRoutes;