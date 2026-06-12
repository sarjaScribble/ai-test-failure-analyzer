import mongoose from "mongoose";

const failureSchema = new mongoose.Schema(
  {
    reportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
      required: true,
    },

    buildId: {
      type: String,
      required: true,
    },

    testName: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["PASSED", "FAILED"],
      default: "FAILED",
    },

    errorMessage: String,

    stackTrace: String,
  },
  {
    timestamps: true,
  }
);

const Failure = mongoose.model(
  "Failure",
  failureSchema
);

export default Failure;