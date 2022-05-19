const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { connectMongodb } = require("./database/DataBaseController");
const { logger } = require("./config");

const AuthRoute = require("./routes/AuthRoute");
const QuizRoute = require("./routes/QuizRoute");
const StatsRoute = require("./routes/StatsRoute");

class Server {
  constructor(options) {
    this.options = options;

    this.api = null;
  }

  async configServer() {
    var api = express();

    api.use(express.urlencoded({ limit: "10mb", extended: true }));
    api.use(express.json({ limit: "10mb", extended: true }));
    api.use(cors()); //allow cross domain requesting of urls
    api.use(morgan("dev"));

    //echo route
    api.use("/echo", function (req, res) {
      res.json({
        health: true,
      });
    });

    // api.use("/s", express.static("./src/public"));
    api.set("x-powered-by", false);
    api.set("signature", this.options.signature);

    this.api = api;

    return true;
  }

  async mountRoutes() {
    this.api.use("/api/auth", AuthRoute);
    this.api.use("/api/quiz", QuizRoute);
    this.api.use("/api/stats", StatsRoute);
    return true;
  }

  async startServer() {
    connectMongodb(this.options.mongodb.uri);

    var serverConfigStatus = await this.configServer();

    if (serverConfigStatus !== true) {
      logger.error("FATAL: Failed to configure server");
      return false;
    }

    await this.mountRoutes();
    this.api.use((req, res, next) => {
      const error = new Error("Not Found");
      error.status = 404;
      next(error);
    });
    this.api.use((error, req, res, next) => {
      const status = error.status || 500;
      res.status(status).json({
        error: {
          status,
          message: error.message || "Internal Server Error",
        },
      });
    });
    this.api.listen(this.options.port, () => {
      logger.info(`Listening on http://localhost:${this.options.port}`);
    });
  }
}

module.exports = Server;
