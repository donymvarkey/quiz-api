const express = require("express");
const router = express.Router();
const { isAuthorised } = require("../middlewares");
const {
  createQuiz,
  getMyQuizzes,
  getAllQuizzes,
  addQuestion,
  getQuestion,
} = require("../controllers/QuizController");

// Quiz
router.post("/", isAuthorised, createQuiz);
router.get("/", isAuthorised, getAllQuizzes);
router.get("/my", isAuthorised, getMyQuizzes);

// Question
router.post("/:quizId", isAuthorised, addQuestion);
router.get("/question/:questionId", isAuthorised, getQuestion);

module.exports = router;
