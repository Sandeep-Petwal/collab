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
    const { title = "Untitled Document", content = {} } = req.body;

    const user_id = req?.user?.id

    const rules = { title: "required|string", content: "required", user_id: "required|numeric|exist:users,id" }
    let { status, message } = await validate({ title, content, user_id }, rules);
    if (!status) return sendResponse(res, 400, message);


    // unique documetn id 
    const id = uuidv4();

    const document = await documents.create({ id, user_id, title, content });
    return sendResponse(res, 200, "Document created successfully.", document);
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

module.exports = { getAllDocuments, createDocument, getDocument }       