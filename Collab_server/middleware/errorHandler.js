

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    console.log("\n\nError :" + err);

    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ success: false, message });
};


module.exports = {errorHandler}