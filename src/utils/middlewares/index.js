const APIError = require("../errors");

module.exports = {
  errorMiddleware: function (err, req, res, next) {
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
    res.status(404).json({
      code: 404,
      message: "Not found...",
    });
  },
};
