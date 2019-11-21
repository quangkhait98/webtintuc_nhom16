const router = require("express").Router();
const Comment = require("../model/Comment");

router.post("/create", (req, res) => {
  const comment = new Comment({
    user: req.body.userId,
    news: req.body.newsId,
    content: req.body.content
  });
  comment.save(err => {
    if (err) {
      if ((err.code = 11000)) {
        return res.json({ success: false, message: "already exits" });
      } else {
        return res.send(err);
      }
    }
    Comment.find({ news: req.body.newsId }).sort({createdDate : 1}).populate("user").exec(function(err, comments) {
      if (err) return res.send(err);
      res.send(comments);
    });
  });
});

router.get("/:id", (req, res) => {
  Comment.find({ news: req.params.id }).sort({createdDate : 1}).populate("user").exec(function(err, comments) {
    if (err) return res.send(err);
    res.send(comments);
  });
});

module.exports = router;
