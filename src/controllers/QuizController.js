const Quiz = require("../models/quiz");
const Question = require("../models/questions");
const returnResponse = require("../utils/response/ResponseHandler");

const createQuiz = async (req, res, next) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return returnResponse({ code: 400, msg: "Please enter all data" }, res);
  }
  try {
    const quiz = new Quiz({ title, description, owner: req.user.id });
    const data = await quiz.save();
    if (data) {
      return returnResponse(
        { code: 200, msg: "Quiz created successfully." },
        res
      );
    } else {
      return returnResponse({ code: 400, msg: "Quiz not created." }, res);
    }
  } catch (error) {
    next(error);
  }
};

const getMyQuizzes = async (req, res, next) => {
  const { id } = req.user;
  try {
    const data = await Quiz.find({ owner: id });
    if (data) {
      return returnResponse(
        { code: 200, msg: "Quizzes fetched successfully.", data },
        res
      );
    } else {
      return returnResponse({ code: 400, msg: "No quiz found." }, res);
    }
  } catch (error) {
    next(error);
  }
};

const getAllQuizzes = async (req, res, next) => {
  try {
    const data = await Quiz.find();
    if (data) {
      return returnResponse(
        { code: 200, msg: "Quizzes fetched successfully.", data },
        res
      );
    } else {
      return returnResponse({ code: 400, msg: "No quiz found." }, res);
    }
  } catch (error) {
    next(error);
  }
};

const addQuestion = async (req, res, next) => {
  const { quizId } = req.params;
  const { question, options } = req.body;
  if (!question || !options) {
    return returnResponse({ code: 400, msg: "Please enter all data." }, res);
  }
  try {
    const q = new Question({ question, options });
    const data = await q.save();
    if (data) {
      const verifyOwner = await Quiz.findById(quizId);
      if (verifyOwner.owner !== req.user.id) {
        await Question.findByIdAndDelete(data._id);
        return returnResponse(
          { code: 400, msg: "You are not authorized." },
          res
        );
      }
      const quiz = await Quiz.findByIdAndUpdate(
        quizId,
        { $push: { questions: { question: data._id } } },
        { new: true }
      );
      if (quiz) {
        return returnResponse(
          { code: 200, msg: "Question added successfully." },
          res
        );
      } else {
        return returnResponse({ code: 400, msg: "Question not added." }, res);
      }
    }
  } catch (error) {
    next(error);
  }
};

const getQuestion = async (req, res, next) => {
  const { questionId } = req.params;
  try {
    const data = await Question.findById(questionId);
    if (data) {
      return returnResponse(
        { code: 200, msg: "Question fetched successfully.", data },
        res
      );
    } else {
      return returnResponse({ code: 400, msg: "No question found." }, res);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createQuiz,
  getMyQuizzes,
  getAllQuizzes,
  addQuestion,
  getQuestion,
};
