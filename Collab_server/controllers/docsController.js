const { users, documents } = require("../models");
const { sendResponse } = require("../utils/response");
const { Op, where } = require("sequelize");
const validate = require("../utils/validator");
const { v4: uuidv4 } = require("uuid");





// get all documents
const getAllDocuments = async (req, res) => {
    // get limit, page , userId from query params
    const { limit = 10, page = 1, userId } = req.query;
    const offset = (page - 1) * limit;

    const rules = {
        userId: "required|numeric",
        limit: "required|numeric",
        page: "required|numeric",
    }

    let { status, message } = await validate({ userId, limit, page }, rules);
    if (!status) return sendResponse(res, 400, message);

    const user = await users.findOne({ where: { id: userId } });
    if (!user) return sendResponse(res, 400, "User not found.");


    // get documents
    try {
        let { count, rows } = await documents.findAndCountAll({
            where: { user_id: userId },
            limit: Number(limit),
            offset: Number(offset),
            order: [["createdAt", "DESC"]],
        });


        return sendResponse(res, 200, "Documents fetched successfully.", { count, rows });
    } catch (error) {

        console.log(error)
        return sendResponse(res, 500, "Internal Server Error.");
    }




}


// create a document
const createDocument = async (req, res) => {
    const { title = "Untitled Document", content = " " } = req.body;

    const user_id = req?.user?.id
    console.table({ title, content, user_id });

    const rules = { title: "required|string", user_id: "required|numeric|exist:users,id" }
    let { status, message } = await validate({ title, user_id }, rules);
    if (!status) return sendResponse(res, 400, message);

    // unique documetn id 
    const id = uuidv4();
    
    try {
        const document = await documents.create({ id, user_id, title, content });
        return sendResponse(res, 200, "Document created successfully.", document);

    } catch (error) {
        console.log("Errror" + error);
        res.status(500).json({ success: false, error: "Server error" });

    }
}

// get a document
const getDocument = async (req, res) => {
    const { id } = req.params;
    if (!id) return sendResponse(res, 400, "Provide a document id.");

    const document = await documents.findOne({
        where: { id },
        include: [
            {
                model: users,
                attributes: ["id", "name", "email"],
                as: "user",
            },
        ],

    });
    if (!document) return sendResponse(res, 400, "Document not found.");

    return sendResponse(res, 200, "Document fetched successfully.", document);
}

// edit/save document
const editDocument = async (req, res) => {
    const { content, title } = req.body;
    const { id } = req.params;
    let { status, message } = await validate({ id }, { id: "required|string|exist:documents,id" });

    if (!status) return sendResponse(res, 400, message);
    if (!content && !title) return sendResponse(res, 400, "Invalid Fields !");

    // data to update
    let dataToUpdate = {};
    Object.assign(dataToUpdate, title && { title }, content && { content });

    // update and get the data
    const [rowCount] = await documents.update(dataToUpdate, { where: { id } });
    if (rowCount === 0) return sendResponse(res, 404, "Document not found or no changes made.");
    const updatedDocument = await documents.findOne({ where: { id } });
    return sendResponse(res, 200, "Document updated successfully.", updatedDocument);
}

module.exports = { getAllDocuments, createDocument, getDocument, editDocument }       