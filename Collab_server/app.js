// imports
require("dotenv").config();
const PORT = process.env.PORT
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require("cors");

// initialization
const app = express();
const server = http.createServer(app);
const io = new Server(server);


// middleware
require('express-async-errors');
app.use(express.json());
app.use(cors({ origin: "*" }));

const { errorHandler } = require('./middleware/errorHandler.js');
app.use(errorHandler);



// routes
const router = require("./routes/index.js");
app.use("/api/v1", router);



// database
// const {syncModels} = require('./models');
// syncModels();


// socket handler
require('./sockets/socketHandler.js')(io);


// starting the server
server.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});