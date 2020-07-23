const multer = require("multer");

// specify storage engine

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads")
  },
  filename: function (req, file, callback) {
    callback(null, new Date.now() + "-" + file.originalname);
  }

});
