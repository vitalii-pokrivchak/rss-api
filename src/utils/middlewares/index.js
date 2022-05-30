const APIError = require("../errors");

module.exports = {
    errorMiddleware: function (err, req, res, _) {
        res.error = err.message;
        if (err instanceof APIError) {
            res.status(err.code).json(err);
        } else {
            res.status(500).json({
                code: 500,
                message: "Internal Server Error",
            });
        }
    },
    notFoundMiddleware: function (_, res) {
        const error = {code: 404, message: "Not found..."};
        res.error = error.message;
        res.status(404).json(error);
    },
};
