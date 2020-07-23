const multer = require("multer");
// const { modelName } = require("../models/users");

// specify storage engine

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, new Date.now() + "-" + file.originalname);
  }

});
// file validation
const filterFilter = (req, file, callback) => {
  if (file.mimetype === "video/mp3" || file.mimetype === "video/wav") {
    callback(null, true);
  } else {
    callback({ message: "Usupported File Format" }, false);
  }
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 }, // note this size can be modified
  filterFilter: filterFilter
});

module.exports = upload;
