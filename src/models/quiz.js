const mongoose = require("mongoose");

const Quiz = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [
    {
      question: { type: mongoose.SchemaTypes.ObjectId, ref: "Question" },
    },
  ],
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Quiz", Quiz);
