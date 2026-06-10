const Report = require("../model/Report");

exports.uploadReport = async (req, res) => {
  const report = await Report.create({
    buildId: req.body.buildId,
    projectName: req.body.projectName,
    uploadedBy: req.user.id,
    filePath: req.file.path
  });

  res.status(201).json(report);
};