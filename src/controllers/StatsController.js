const Stats = require("../models/stats");
const returnResponse = require("../utils/response/ResponseHandler");

const addStats = async (req, res, next) => {
  const { score } = req.body;
  if (!score || score < 0) {
    return returnResponse({ code: 400, msg: "Invalid data." }, res);
  }
  try {
    const isStatsExists = await Stats.findOne({ userId: req.user.id });

    if (isStatsExists) {
      const data = await Stats.findByIdAndUpdate(isStatsExists._id, {
        $push: {
          stats: {
            quizId: req.params.quizId,
            score,
          },
        },
      });

      if (data) {
        return returnResponse(
          { code: 200, msg: "Stats added successfully." },
          res
        );
      }
      return returnResponse({ code: 400, msg: "Unable to save stats." }, res);
    } else {
      const stats = new Stats({
        userId: req.user.id,
        stats: [
          {
            quizId: req.params.quizId,
            score,
          },
        ],
      });

      const data = await stats.save();

      if (data) {
        return returnResponse(
          { code: 200, msg: "Stats added successfully." },
          res
        );
      }
      return returnResponse({ code: 400, msg: "Unable to save stats." }, res);
    }
  } catch (error) {
    next(error);
  }
};

const getAllStats = async (req, res, next) => {
  const { id } = req.user;
  try {
    const data = await Stats.find({ userId: id });

    if (data) {
      return returnResponse(
        { code: 200, msg: "Stats fetched successfully.", data: data },
        res
      );
    }
    return returnResponse({ code: 400, msg: "Unable to fetch stats." }, res);
  } catch (error) {
    next(error);
  }
};

const getStatsofQuizWithId = async (req, res, next) => {
  try {
    const data = await Stats.find(
      {
        stats: {
          $elemMatch: {
            quizId: req.params.quizId,
          },
        },
      },
      {
        "stats.$": 1,
        userId: 1,
      }
    );

    if (data) {
      return returnResponse(
        { code: 200, msg: "Stats fetched successfully.", data: data },
        res
      );
    }

    return returnResponse({ code: 400, msg: "Unable to fetch stats." }, res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addStats,
  getAllStats,
  getStatsofQuizWithId,
};
