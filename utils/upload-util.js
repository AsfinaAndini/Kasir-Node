const multer = require("multer");
const path = require("path");
const fs = require("fs");

const createDirectory = (directoryPath) => {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }
};

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    const destinationPath = path.join(__dirname, "../images");
    createDirectory(destinationPath);
    cb(null, destinationPath);
  },

  filename: (_, file, cb) => {
    cb(null, `images-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const acceptedType = ["image/jpg", "image/jpeg", "image/png"];
    if (!acceptedType.includes(file.mimetype)) {
      cb(null, false);
      return cb(`Type file ${file.mimetype} not allowed`);
    }

    const fileSize = req.headers["content-length"];
    const maxSize = 1 * 1024 * 1024;
    if (fileSize > maxSize) {
      cb(null, false);
      return cb(`File size is too large`);
    }
    cb(null, true);
  },
});

module.exports = upload;