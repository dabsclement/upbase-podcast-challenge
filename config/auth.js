const jwt = require("jsonwebtoken");
const userModel = require("../models/users");

const checkAdmin = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decode = jwt.verify(token, process.env.secretKey || "defaultKey");
  const userMail = decode.email;
  await userModel.findOne({ emailAddress: userMail })
    .then(data => {
      if (data.emailAddress !== userMail) {
        throw new Error("Auth failed");
      }

      if (!data.isAdmin) {
        res.status(401).json({
          status: "error",
          message: "Access Forbidden"
        });
      }
      next();
    })

    .catch((err) => {
      res.status(500).json({
        status: "error",
        message: err.message
      });
    });
};

const checkAuth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decode = jwt.verify(token, process.env.secretKey || "defaultKey");
  const userMail = decode.email;
  await userModel.findOne({ emailAddress: userMail })
    .then(data => {
      if (data.emailAddress !== userMail) {
        throw new Error("Auth failed");
      }
      next();
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        message: err.message
      });
    });
};

module.exports = { checkAdmin, checkAuth };
