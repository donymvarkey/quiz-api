const { Router } = require("express");
const {
  addStats,
  getAllStats,
  getStatsofQuizWithId,
} = require("../controllers/StatsController");
const { isAuthorised } = require("../middlewares");

const router = Router();

router.post("/quiz/:quizId", isAuthorised, addStats);
router.get("/", isAuthorised, getAllStats);
router.get("/quiz/:quizId", isAuthorised, getStatsofQuizWithId);

module.exports = router;
