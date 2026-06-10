const Failure = require(
  "../models/Failure"
);

const Analysis = require(
  "../models/Analysis"
);

const AIService = require(
  "../../services/ai.service"
);

exports.generateAnalysis =
  async (req, res) => {

  try {

    const failure =
      await Failure.findById(
        req.params.failureId
      );

    if (!failure) {
      return res.status(404).json({
        success: false,
        message:
          "Failure not found"
      });
    }

    const result =
      await AIService.analyzeFailure(
        failure
      );

    const analysis =
      await Analysis.create({
        failureId:
          failure._id,

        rootCause:
          result.rootCause,

        suggestedFix:
          result.suggestedFix,

        confidenceScore:
          result.confidenceScore
      });

    res.status(201).json({
      success: true,
      data: analysis
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Analysis generation failed"
    });
  }
};
