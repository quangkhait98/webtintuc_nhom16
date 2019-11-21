const router = require("express").Router();
const User = require("../model/User");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const generateAccesssToken = require("../utils/generateAccessToken");
const _ = require("lodash");
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: "/err",
  }),
  (req, res) => {
    const token = req.user.accessToken;
    res.cookie("token", token);
    res.cookie("user", _.pick(req.user, ["name", "email", "_id"]));
    res.cookie("isAuthenticated", true);
    res.redirect("http://localhost:3000/")
  }
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/err"
  }),
  (req, res) => {
    const token = req.user.accessToken;
    res.cookie("token", token);
    res.cookie("user", _.pick(req.user, ["name", "email", "_id"]));
    res.cookie("isAuthenticated", true);
    res.redirect("http://localhost:3000/")
  }
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["email", "gender", "id", "displayName", "photos"]
    },
    function(accessToken, refreshToken, profile, done) {
      const jwtoken = generateAccesssToken(
        profile._json.name,
        profile._json.email,
        accessToken
      );
      User.findOne({ facebookId: profile._json.id }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (user) {
          user.accessToken = jwtoken;
          user.save(err => {
            if (err) {
              return done(err);
            }
          });
          return done(null, user);
        } else {
          const newUser = new User({
            facebookId: profile._json.id,
            name: profile._json.name,
            email: profile._json.email,
            accessToken: jwtoken
          });
          newUser.save(function(err) {
            if (err) {
              throw err;
            }
            return done(null, newUser);
          });
        }
      });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
      const jwtoken = generateAccesssToken(
        profile._json.name,
        profile._json.email,
        accessToken
      );
      User.findOne({ googleId: profile._json.sub }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (user) {
          user.accessToken = jwtoken;
          user.save(err => {
            if (err) {
              return done(err);
            }
          });
          return done(null, user);
        } else {
          const newUser = new User({
            googleId: profile._json.sub,
            name: profile._json.name,
            email: profile._json.email,
            accessToken: jwtoken
          });
          newUser.save(function(err) {
            if (err) {
              throw err;
            }
            return done(null, newUser);
          });
        }
      });
    }
  )
);

module.exports = router;
