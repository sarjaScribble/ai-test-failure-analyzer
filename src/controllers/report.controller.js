const Report = require(
  "../models/Report"
);

exports.uploadReport = async (
  req,
  res
) => {
  try {
    const {
      buildId,
      projectName
    } = req.body;

    console.log(req.body);
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "Report file is required"
      });
    }

    const report =
      await Report.create({
        buildId,
        projectName,

        fileName:
          req.file.originalname,

        filePath: req.file.path,

        fileType: req.file.mimetype,

        uploadedBy: req.user.id
      });

    res.status(201).json({
      success: true,
      message:
        "Report uploaded successfully",
      data: report
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to upload report"
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
};