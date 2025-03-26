// file contains our custom error handler
// middleware refers to functions that execute during the request/response cycle

// overwrite default express error handler, initially when looking at headers > content-type on postman, our post request showed text/html
// next keyword calls any further middleware
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500    // ternary conditional, use response statusCode/what was set in controller, otherwise use 500 error code

    res.status(statusCode)

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack // stack message only appears in development mode
    })
}

module.exports = {
    errorHandler,
}