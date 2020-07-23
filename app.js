var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyparser = require("body-parser");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const mongoose = require("mongoose");

var app = express();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use("/", indexRouter);
app.use("/users", usersRouter);
mongoose
  .connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true
  })
  .then(() => console.log("database connected sucessfully"))
  .catch((err) => console.log(err));

module.exports = app;
