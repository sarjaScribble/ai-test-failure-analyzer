import Report from "../models/Report.js";
import Failure from "../models/Failure.js";
import ReportParserService from "../../services/reportParser.service.js";
import mongoose from "mongoose";

export const uploadReport = async (
  req,
  res
) => {
  try {
    const {
      buildId,
      projectName,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Report file is required",
      });
    }

    const report = await Report.create({
      buildId,
      projectName,
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      uploadedBy: req.user.id,
    });

    const failures =
      await ReportParserService.parseJUnitReport(
        req.file.path
      );

    if (failures.length > 0) {
      await Failure.insertMany(
        failures.map((failure) => ({
          ...failure,
          buildId,
          reportId: report._id,
        }))
      );
    }

    res.status(201).json({
      success: true,
      message:
        "Report uploaded and parsed successfully",
      data: {
        reportId: report._id,
        failuresFound:
          failures.length,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to process report",
    });
  }
};

export const getReports = async (
  req,
  res
) => {
  try {
    const reports =
      await Report.find()
        .populate(
          "uploadedBy",
          "name email"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      data: reports,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch reports",
    });
  }
};

export const getFailures = async (
  req,
  res
) => {
  try {
    console.log(
      req.params.reportId
    );

    const failures =
      await Failure.find({
        reportId:
          req.params.reportId,
      });

    console.log(failures);

    res.status(200).json({
      success: true,
      data: failures,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch failures",
    });
  }
};