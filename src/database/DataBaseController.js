const mongoose = require("mongoose");
const { logger } = require("../config");

connectMongodb = async (uri) => {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.Promise = global.Promise;
  logger.info("Connected to MongoDB instance");
};

module.exports = {
  connectMongodb,
};
