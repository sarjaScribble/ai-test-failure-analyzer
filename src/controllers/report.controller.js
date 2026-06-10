const Report = require("../models/Report");
const Failure = require("../models/Failure");
const ReportParserService = require(
  "../../services/reportParser.service"
);
const { default: mongoose } = require("mongoose");

exports.uploadReport = async (
  req,
  res
) => {
  try {
    const {
      buildId,
      projectName
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Report file is required"
      });
    }

    const report = await Report.create({
      buildId,
      projectName,
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      uploadedBy: req.user.id
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
          reportId: report._id
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
          failures.length
      }
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to process report"
    });
  }
};

exports.getReports = async (
  req,
  res
) => {
  const reports =
    await Report.find()
      .populate(
        "uploadedBy",
        "name email"
      )
      .sort({
        createdAt: -1
      });

  res.json({
    success: true,
    data: reports
  });

}

exports.getFailures = async (
  req,
  res
) => {
  try {
    console.log(req.params.reportId);
    
    const failures =
      await Failure.find({
        reportId:
          req.params.reportId
      });

      console.log(failures);
      
    res.status(200).json({
      success: true,
      data: failures
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch failures"
    });
  }
};