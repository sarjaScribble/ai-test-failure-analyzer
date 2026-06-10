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

    fileName: {
      type: String,
      required: true
    },

    filePath: {
      type: String,
      required: true
    },

    fileType: {
      type: String
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: String,
      enum: [
        "UPLOADED",
        "PROCESSING",
        "ANALYZED",
        "FAILED"
      ],
      default: "UPLOADED"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Report",
  reportSchema
);