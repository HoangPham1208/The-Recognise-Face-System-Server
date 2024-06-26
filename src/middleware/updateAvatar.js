const path = require("path");
const multer = require("multer");
const fs = require("fs");

function updateAvatar(file_field) {
  return function (req, res, next) {
    const id = String(req.user.id);
    if (!id)
      return res
        .status(400)
        .json({ status: "Bad request", message: "No id user provided" });
    const dir = path.join(process.env.IMAGES_PATH_AVATAR);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }); // Ensure nested directories are created if needed
    }
    const storage = multer.diskStorage({
      destination: dir,
      filename: (req, file, cb) => {
        // convert all image to jpg
        cb(null, 1 + ".jpg"); // Use timestamp to generate a unique filename
      },
    });

    const upload = multer({
      storage: storage,
      limits: {
        fieldNameSize: 300,
        fileSize: 1024 * 1024 * 10, // 10 Mb allowed
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
        if (fileSize > 1024 * 1024 * 10) {
          return res.status(400).json({
            status: "Bad request",
            message: "File size exceeds the limit (10MB)",
          });
        }
        callback(null, true);
      },
    });
    upload.single(file_field)(req, res, next);
  };
}

module.exports = updateAvatar;
