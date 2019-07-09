const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const Profile = require("../../models/Profile");

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  "/",
  [
    check("email", "Please include a valid email")
      .isEmail()
      .custom(async (value, { req: { body: { email } } }) => {
        const user = await User.findOne({ email });
        if (user) {
          throw new Error("This email is already taken.");
        }
        return true;
      }),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check("password2").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match");
      }
      return true;
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, profileImageUrl, bio } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        email,
        password,
        profileImageUrl
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      const newUser = await user.save();

      await new Profile({
        user: user.id,
        name,
        bio
      }).save();

      res.status(201).json(newUser);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    POST api/users/password
// @desc     Update password
// @access   Private
router.post(
  "/password",
  [
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check("password2").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match");
      }
      return true;
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user = await User.findById(req.user.id);

    const { password } = req.body;

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      // If user doesn't have a password (he logged in using OAuth)
      if (!user.password) {
        user.password = hashedPassword;
        user = await user.save();
      } else {
        // User updating his current password
        user = await User.findOneAndUpdate(
          {
            _id: req.user.id
          },
          {
            $set: {
              password: hashedPassword
            }
          },
          {
            new: true
          }
        );
      }

      res.status(201).json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    POST api/users
// @desc     Update email
// @access   Private
router.post(
  "/email",
  [
    check("email", "Please include a valid email")
      .isEmail()
      .custom(async (value, { req: { body: { email } } }) => {
        const user = await User.findOne({ email });
        if (user) {
          throw new Error("This email is already taken.");
        }
        return true;
      }),
    check("email2").custom((value, { req }) => {
      if (value !== req.body.email) {
        throw new Error("Emails don't match");
      }
      return true;
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      let user = await User.findOneAndUpdate(
        {
          _id: req.user.id
        },
        {
          $set: {
            email
          }
        },
        {
          new: true
        }
      );

      res.status(201).json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
