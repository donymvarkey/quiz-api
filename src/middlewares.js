const jwt = require("jsonwebtoken");
const returnResponse = require("./utils/response/ResponseHandler");
const defaults = require("./defaults");
module.exports = {
  allowCrossDomain: function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, x-auth-token, X-Requested-With, Content-Type"
    );

    // intercept OPTIONS method
    if ("OPTIONS" == req.method) {
      //res.sendStatus(200);
      next();
    } else {
      next();
    }
  },

  isAuthorised: function (req, res, next) {
    var verificationHeader = req.headers["x-auth-token"];
    var verify;

    if (
      verificationHeader === undefined ||
      verificationHeader === null ||
      verificationHeader === ""
    ) {
      returnResponse({ code: 401, msg: "Unauthorized", data: null }, res);
      return;
    }

    try {
      verify = jwt.verify(verificationHeader, process.env.SIGNATURE);
      req.user = verify;

      next();
    } catch (e) {
      next(e);
    }
  },
};
