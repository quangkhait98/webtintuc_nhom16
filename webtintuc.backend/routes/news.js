const router = require("express").Router();
const News = require("../model/News");
const Category = require("../model/Category");
const removeVietnameseAccent = require("../utils/ removeVietnameseAccent");
const pageSize = 10;
router.post("/create", (req, res) => {
  let news = new News({
    title: req.body.title,
    titleUnsigned: removeVietnameseAccent(req.body.title),
    summary: req.body.summary,
    content: req.body.content,
    Highlights: req.body.Highlights,
    newsType: req.body.newsTypeId,
    category: req.body.categoryId
  });

  news.save((err, news) => {
    if (err) {
      if ((err.code = 11000)) {
        return res.json({ success: false, message: "news already exits" });
      } else {
        return res.send(err);
      }
    }

    Category.findOne({ _id: news.category }, (err, category) => {
      if (category) {
        category.news.push(news);
        category.save();
        res.json({ message: "created news" });
      }
    });
  });
});

router.get("/newsest", (req, res) => {
  News.find()
    .sort({ field: "asc", create_at: -1 })
    .skip(0)
    .limit(5)
    .exec(function(err, news) {
      if (err) return res.statusCode(500).send(err);
      res.send(news);
    });
});

router.get("/newsviewmost", (req, res) => {
  News.find()
    .sort({ field: "asc", viewsNumber: -1 })
    .limit(5)
    .exec(function(err, news) {
      if (err) return res.send(err);
      res.send(news);
    });
});

router.get("/newsestbynewstype", (req, res) => {
  News.find({ newsType: req.query.newsTypeId })
    .populate("newsType")
    .skip(+req.query.skip)
    .limit(+req.query.limit)
    .exec(function(err, news) {
      if (err) return res.send(err);
      res.send(news);
    });
});

router.get("/newsbynewstype", (req, res) => {
  const currentPage = +req.query.currentPage;

  News.find({ newsType: req.query.newsTypeId })
    .populate("newsType")
    .populate("category")
    .skip((currentPage - 1) * pageSize)
    .limit(pageSize)
    .sort({ field: "asc", create_at: -1 })
    .exec(function(err, news) {
      News.count().exec(function(err, count) {
        const totalPage = Math.ceil(count / pageSize);
        if (currentPage > totalPage) {
          res.send({
            news: [],
            totalPage: totalPage,
            currentPage: currentPage
          });
        }
        res.send({
          news: news,
          totalPage: totalPage,
          currentPage: currentPage
        });
      });
    });
});

router.get("/newsestbycategory", (req, res) => {
  News.find().exec(function(err, news) {
    if (err) return res.send(err);
    res.send(news);
  });
});

router.get("/:id", (req, res) => {
  News.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { viewsNumber: 1 } }
  ).exec(function(err, news) {
    if (err) return res.send(err);
    res.send(news);
  });
});

router.get("/:id/getnewssametype", (req, res) => {
  News.find({
    $and: [{ _id: { $ne: req.params.id } }, { newsType: req.query.newsTypeId }]
  })
    .sort({ field: "asc", create_at: -1 })
    .skip(0)
    .limit(5)
    .exec(function(err, news) {
      if (err) return res.send(err);
      res.send(news);
    });
});

router.get("/", (req, res) => {
  const keyword = req.query.q;
  const currentPage = +req.query.currentPage;

  News.find({ titleUnsigned:new RegExp(keyword, "i") })
    .populate("newsType")
    .populate("category")
    .skip((currentPage - 1) * pageSize)
    .limit(pageSize)
    .sort({ field: "asc", create_at: -1 })
    .exec(function(err, news) {
      News.count().exec(function(err, count) {
        const totalPage = Math.ceil(count / pageSize);
        if (currentPage > totalPage) {
          res.send({
            news: [],
            totalPage: totalPage,
            currentPage: currentPage
          });
        }
        res.send({
          news: news,
          totalPage: totalPage,
          currentPage: currentPage
        });
      });
    });
});


module.exports = router;
