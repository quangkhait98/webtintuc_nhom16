const router = require("express").Router();
const NewsType = require("../model/Newstype");
const removeVietNameseAccent = require("../utils/ removeVietnameseAccent");
router.post("/create", (req, res) => {
  const newsType = new NewsType({
    category: req.body.categoryId,
    name: req.body.name,
    nameUnsigned: removeVietNameseAccent(req.body.name)
  });
  newsType.save(err => {
    if (err) {
      if ((err.code = 11000)) {
        return res.json({ success: false, message: "newsType already exits" });
      } else {
        return res.send(err);
      }
    }
    res.json({ message: "created" });
  });
});

router.get("/", (req, res) => {
  NewsType.findOne({ _id: "5dc6d8094a99f935c06a259a" })
    .populate("category")
    .exec((err, newstype) => {
      if (err) res.send(err);
      res.send(newstype);
    });
});

module.exports = router;
