const multer = require("multer"); // "^1.3.0"
const multerS3 = require("multer-s3"); //"^2.7.0"
const { S3Client } = require("@aws-sdk/client-s3");
// Multer configuration for handling file uploads
require("dotenv").config();

const s3Config = new S3Client({
  region: "us-west-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif|svg|webp)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({
  fileFilter: imageFilter,
  storage: multerS3({
    s3: s3Config,
    bucket: `myhospitalbucketfyp`,
    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
});

module.exports = upload;
