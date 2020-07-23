var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyparser = require("body-parser");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const mongoose = require("mongoose");
const upload = require('./config/multer');
const cloudinary = require ("./config/cloudinary");
const fs = require('fs');
const { UploadStream } = require("cloudinary");

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
app.use('/upload-audio', upload.array('video'), async (req, res) =>{
if (req.method = 'POST')
{
  const urls = []
  const files = req.files
  for (const file of files){
    const { path } = file
    cont newPath = await UploadStream(path)
    urls.push(newPath)
    fs.unlinkSync(path)
  }
  res.status(200).json({
    message: 'audio uploaded successfully',
    data:urls
  })
} else{
  res.status(405).json({
    err: "ausio not uploaded successfully"
  })
}
})
mongoose
  .connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true
  })
  .then(() => console.log("database connected sucessfully"))
  .catch((err) => console.log(err));

module.exports = app;
