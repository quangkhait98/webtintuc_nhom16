const router = require("express").Router();
const Category = require("../model/Category");
const removeVietNameseAccent = require("../utils/ removeVietnameseAccent");
router.post("/create", (req, res) => {
  let category = new Category({
    name: req.body.name,
    nameUnsigned: removeVietNameseAccent(req.body.name),
    newsType: req.body.newsType
  });
  category.save(err => {
    if (err) {
      if ((err.code = 11000)) {
        return res.json({ success: false, message: "category already exits" });
      } else {
        return res.send(err);
      }
    }
    res.json({ message: "created" });
  });
});

router.get("/", (req, res) => {
  Category.find()
    .populate("newsType")
    .exec((err, categories) => {
      if (err) res.send(err);
      res.send(categories);
    });
});

router.get("/getnewsestbycategory", (req, res) => {
  Category.find()
    .populate({
      path: "news",
      options: { sort: { field: "desc", create_at: -1 }, limit: 2 }
    })
    .populate("newsType")
    .exec((err, categories) => {
      if (err) res.send(err);
      res.send(categories);
    });
});

router.delete("/delete", (req, res) => {
  Category.remove(
    {
      _id: req.params.categoryId
    },
    (err, category) => {
      if (err) return res.send(err);
      return res.send({ message: "delete complete" });
    }
  );
});
module.exports = router;
