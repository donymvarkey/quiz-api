const mongoose = require("mongoose");

const Stats = mongoose.Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
  stats: [
    {
      quizId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Quiz",
        required: true,
      },
      score: { type: Number, required: true },
      isCompleted: { type: Boolean, required: true, default: true },
    },
  ],
});

module.exports = mongoose.model("Stats", Stats);
