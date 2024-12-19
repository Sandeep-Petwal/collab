const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = (io) => {
    console.log("Inside sokcet handler.")
    // socket middleware to protect WS
    // io.use((socket, next) => {
    //     const token = socket.handshake.auth.token;
    //     if (!token) {
    //         console.log("Failed WS Connection attempt.(Unauthorized)")
    //         return next(new Error('Authentication error: Unauthorized'));
    //     }

    //     jwt.verify(token, SECRET_KEY, (err, decoded) => {
    //         if (err) {
    //             console.log("Failed WS Connection attempt.(Invalid token.)")
    //             return next(new Error('Authentication error: Invalid token'));
    //         }
    //         socket.user = decoded;
    //         next();
    //     })
    // })


    io.on("connection", (socket) => {
        console.log(`\nUser connected :: ${socket.id}\n`);



        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
};
