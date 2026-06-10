const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    buildId: {
      type: String,
      required: true
    },

    projectName: {
      type: String,
      required: true
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    filePath: String,

    status: {
      type: String,
      enum: ["UPLOADED", "PROCESSING", "ANALYZED"],
      default: "UPLOADED"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Report", reportSchema);