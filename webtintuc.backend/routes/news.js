const router = require("express").Router();
const News = require("../model/News");
const Category = require("../model/Category");
const User = require("../model/User");
const removeVietnameseAccent = require("../utils/ removeVietnameseAccent");
const pageSize = 10;
const authUser = require("../middleware/authUser");
const _ = require("lodash");
let Parser = require("rss-parser");
let parser = new Parser({
  defaultRSS: 3.0
});
router.post("/create", authUser, (req, res) => {
  console.log(req);
  let news = new News({
    title: req.body.title,
    titleUnsigned: removeVietnameseAccent(req.body.title),
    summary: req.body.summary,
    content: req.body.content,
    newsType: "5de91080d2be6d1c6e5c2d51",
    category: "5de9101cd2be6d1c6e5c2d50",
    user: req.decoded.id
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
      }
    });
    User.findOne({ _id: news.user }, (err, user) => {
      if (user) {
        user.news.push(news);
        user.save();
        res.json({ message: "created news" });
      }
    });
  });
});

router.get("/crawla", (req, res) => {
  const linkRss = [
    "https://vietnamnet.vn/rss/giao-duc.rss",
    "https://vietnamnet.vn/rss/thoi-su.rss"
    // "https://vietnamnet.vn/rss/kinh-doanh.rss",
    // "https://vietnamnet.vn/rss/giai-tri.rss",
    // "https://vietnamnet.vn/rss/the-gioi.rss",
    // "https://vietnamnet.vn/rss/doi-song.rss",
    // "https://vietnamnet.vn/rss/the-thao.rss",
    // "https://vietnamnet.vn/rss/cong-nghe.rss"
  ];
  const category = [
    "5dc6d58c31e95f335ff5d388",
    "5dc6d5e431e95f335ff5d38d"
    // "5dc6d5c431e95f335ff5d38a",
    // "5dc6d61631e95f335ff5d390",
    // "5dc6d5c431e95f335ff5d38a",
    // "5dc6d5b631e95f335ff5d389",
    // "5dc6d5d531e95f335ff5d38c",
    // "5dc6d60731e95f335ff5d38f"
  ];
  const newsType = [
    "5dc6d8094a99f935c06a259a",
    "5dce11af603b415550d324b4"
    // "5dce10f4603b415550d324a8",
    // "5dce1250603b415550d324c0",
    // "5dce1100603b415550d324a9",
    // "5dc6d8634a99f935c06a259e",
    // "5dce1185603b415550d324b2",
    // "5dce1227603b415550d324bd"
  ];
  (async () => {
    await Promise.all(
      linkRss.map(async (rss, index) => {
        console.log(rss, index);
        let feed = await parser.parseURL(rss);
        const rex = /https:([^'\"]*?)(\.png|\.jpg|\.gif)/g;
        await Promise.all(
          feed.items.map(async (item, index) => {
            if (!_.isNull(item)) {
              const content = _.get(item, "content:encoded");
              const image = _.isNull(content.match(rex)[1])
                ? content.match(rex)[0]
                : content.match(rex)[1];
              let news = await new News({
                title: _.get(item, "title"),
                titleUnsigned: removeVietnameseAccent(_.get(item, "title")),
                summary: _.get(item, "content"),
                content: content,
                Highlights: 1,
                newsType: newsType[index],
                category: category[index],
                image: image
              });
              try {
                await news.save();
              } catch (err) {
                console.log(err);
              }
              try {
                await Category.findOne(
                  { _id: news.category },
                  (err, category) => {
                    if (category) {
                      category.news.push(news);
                      category.save();
                    }
                  }
                );
              } catch (err) {
                console.log(err);
              }
            }
          })
        );
      })
    ).then(() => res.send({ message: "success" }));
  })();
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

// router.get("/newsestbynewstype", (req, res) => {
//   News.find({ newsType: req.query.newsTypeId })
//     .populate("newsType")
//     .skip(+req.query.skip)
//     .limit(+req.query.limit)
//     .exec(function(err, news) {
//       if (err) return res.send(err);
//       res.send(news);
//     });
// });

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

router.get("/tintubandoc", (req, res) => {
  News.find({ newsType: "5de91080d2be6d1c6e5c2d51" })
    .sort({ field: "asc", create_at: -1 })
    .skip(0)
    .limit(3)
    .exec(function(err, news) {
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

  News.find({ titleUnsigned: new RegExp(keyword, "i") })
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

router.put("/:id/update", authUser, (req, res) => {
  News.findOne({ _id: req.params.id, user: req.decoded.id }).exec(
    (err, news) => {
      if (err) return res.send(err);
      news.update({ ...req.body }, err => {
        if (err) return res.send(err);
        res.send({ status: "success" });
      });
    }
  );
});

router.delete("/:id/delete", authUser, (req, res) => {
  News.findByIdAndDelete({ _id: req.params.id, user: req.decoded.id }).exec(
    err => {
      if (err) return res.send(err);
      res.send({ status: "success" });
    }
  );
});

module.exports = router;
