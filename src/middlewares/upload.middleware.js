const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/reports");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      file.originalname;

    cb(null, uniqueName);
  }
});

const fileFilter = (
  req,
  file,
  cb
) => {
  const allowedTypes = [
    ".xml",
    ".json"
  ];

  const ext = path.extname(
    file.originalname
  );

  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only XML and JSON files are allowed"
      )
    );
  }
};

console.log(fileFilter);

module.exports = multer({
  storage,
  fileFilter
});