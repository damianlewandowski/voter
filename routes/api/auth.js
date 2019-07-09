const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../../models/User");
const passportConfig = require("../../config/passport");

const CLIENT_HOME_PAGE_URL = "http://localhost:3000";

// @route    GET api/auth
// @desc     Authenticate user and return user on success
// @access   Public
router.get("/", passportConfig.isAuthenticated, (req, res) => {
  return res.json({
    user: req.user,
    cookies: req.cookies
  });
});

// @route    POST api/auth
// @desc     Authenticate user using email and password
// @access   Public
router.post("/local", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (info) {
      return res.status(404).send(info);
    }

    req.logIn(user, async err => {
      if (err) {
        console.dir(err);
        return next(err);
      }

      const loggedUser = await User.findById(user._id).select("-password");
      res.json(loggedUser);
    });
  })(req, res, next);
});

// @route    GET api/auth/github
// @desc     Authenticate user using github OAuth
// @access   Public
router.get("/github", passport.authenticate("github"));

// @route    GET api/auth/github/callback
// @desc     Github OAuth callback
// @access   Public
router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/login/failed"
  })
);

// @route    GET api/auth/google
// @desc     Authenticate user using Google OAuth
// @access   Public
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// @route    GET api/auth/google/callback
// @desc     Google OAuth callback
// @access   Public
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/login/failed"
  })
);

// @route    GET api/auth/login/failed
// @desc     Send user message that OAuth authentication failed
// @access   Public
router.get("/login/failed", (req, res) => {
  res.json({ msg: "Login failed" });
});

// @route    GET api/auth/logout
// @desc     Logout user by destroying his session and removing him from req.user
// @access   Public
router.get("/logout", (req, res) => {
  req.logout();
  res.json({ success: true });
});

module.exports = router;
