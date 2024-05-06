const path = require("path");
const multer = require("multer");
const fs = require("fs");

function updateFaceModel(file_field) {
  return function (req, res, next) {
    let count = 0;
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ status: "Bad request", message: "No id user provided" });

    const dir = path.join(process.env.IMAGES_PATH_MODEL, id);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }); // Ensure nested directories are created if needed
    }

    const storage = multer.diskStorage({
      destination: dir,
      filename: (req, file, cb) => {
        // convert all image to jpg
        cb(null, count + ".jpg"); // Use timestamp to generate a unique filename
      },
    });

    const upload = multer({
      storage: storage,
      limits: {
        fieldNameSize: 300,
        fileSize: 1024 * 1024, // 1 Mb allowed
      },
      fileFilter: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        if (![".png", ".jpg", ".jpeg"].includes(ext)) {
          return res.status(400).json({
            status: "Bad request",
            message: "Only image files are accepted",
          });
        }
        const fileSize = parseInt(req.headers["content-length"]);
        if (fileSize > 1024 * 1024) {
          return res.status(400).json({
            status: "Bad request",
            message: "File size exceeds the limit (1MB)",
          });
        }
        count++;
        callback(null, true);
      },
    });

    FILE_COUNT = 5;
    upload.array(file_field, FILE_COUNT)(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        return res.status(400).json({
          status: "Bad request",
          message:
            err.message + ", number of files can be larger than " + FILE_COUNT,
        });
      } else if (err) {
        // An unknown error occurred
        return res.status(500).json({
          status: "Internal server error",
          message: "Something went wrong",
        });
      }
      // No error occurred, continue with the next middleware
      next();
    });
  };
}

module.exports = updateFaceModel;
