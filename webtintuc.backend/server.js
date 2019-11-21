const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const categoryRoute = require("./routes/category");
const newsRoute = require("./routes/news");
const newsTypeRoute = require("./routes/newstype");
const commentRoute = require("./routes/comment");
const passport = require("passport");

dotenv.config();

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Request-With,content-type, Authorization"
  );
  next();
});
app.use(require("morgan")("combined"));
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));

mongoose.connect(
  process.env.DB_CONNECT_LOCAL,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("connect to db ...")
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use("/category", categoryRoute);
app.use("/auth", authRoute);
app.use("/news", newsRoute);
app.use("/newstype", newsTypeRoute);
app.use("/comment", commentRoute);




app.get("/", (req, res) => {
  res.send("trang chu");
});
app.get("/err", (req, res) => {
  res.send("error");
});
app.get("/protected", (req, res) => {
  res.send("authenticated!");
});


app.listen(8001, () => console.log("server running ..."));
