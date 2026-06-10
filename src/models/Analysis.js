const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    failureId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Failure",
      required: true
    },

    rootCause: {
      type: String,
      required: true
    },

    suggestedFix: {
      type: String,
      required: true
    },

    confidenceScore: {
      type: Number,
      min: 0,
      max: 100
    },

    model: {
      type: String,
      default: "gpt-4o-mini"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Analysis",
  analysisSchema
);