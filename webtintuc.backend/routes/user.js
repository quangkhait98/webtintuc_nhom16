const router = require("express").Router();
const User = require("../model/User");
const authUser = require("../middleware/authUser");
const _ = require("lodash");
router.get("/getnewsbyuserid", authUser, (req, res) => {
  User.findOne({ _id: req.decoded.id })
    .populate("news")
    .exec((err, news) => {
      if (err) res.send(err);
      res.send(_.pick(news, ["name", "email", "_id", "news"]));
    });
});

module.exports = router;
