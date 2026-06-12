import Failure from "../models/Failure.js";
import Analysis from "../models/Analysis.js";
import AIService from "../../services/ai.service.js";

export const generateAnalysis = async (req, res) => {
  try {
    const failure = await Failure.findById(
      req.params.failureId
    );

    if (!failure) {
      return res.status(404).json({
        success: false,
        message: "Failure not found",
      });
    }

    const result =
      await AIService.analyzeFailure(
        failure
      );

    const analysis =
      await Analysis.create({
        failureId: failure._id,
        rootCause: result.rootCause,
        suggestedFix: result.suggestedFix,
        confidenceScore:
          result.confidenceScore,
      });

    res.status(201).json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    console.error(error);

    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        message:
          "AI quota exceeded. Please check OpenAI billing.",
      });
    }

    res.status(500).json({
      success: false,
      message:
        "Analysis generation failed",
    });
  }
};