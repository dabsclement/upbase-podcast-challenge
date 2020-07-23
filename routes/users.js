var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const { checkAuth, checkAdmin } = require("../config/auth");

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);

router.get("/auth", checkAuth, function (req, res, next) {
  res.render("index", { title: "Testing Auth" });
});

router.get("/admin", checkAdmin, function (req, res, next) {
  res.render("index", { title: "Testing Admin auth" });
});

module.exports = router;
