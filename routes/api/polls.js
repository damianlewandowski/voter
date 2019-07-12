const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const { check, body, validationResult } = require("express-validator");

const Poll = require("../../models/Poll");
const passportConfig = require("../../config/passport");

// @route    POST api/polls
// @desc     Create a poll
// @access   Private
router.post(
  "/",
  [
    passportConfig.isAuthenticated,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      // check('options')
      //   .not()
      //   .isEmpty(),
      body("options", "You need to specify some options")
        .not()
        .isEmpty(),
      body("options.*.optionName", "Option Name cannot be empty.").exists()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const poll = await new Poll({
        title: req.body.title,
        options: req.body.options,
        owner: req.user.id
      }).save();

      res.json(poll);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/polls
// @desc     Get all polls
// @access   Public
router.get("/", async (req, res) => {
  try {
    const polls = await Poll.find().sort({ date: -1 });
    res.json(polls);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/polls/:id
// @desc     Get poll by id
// @access   Public
router.get("/:id", async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (poll) {
      return res.json(poll);
    }
    res.status(404).send("Server Error");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/polls/vote/:id
// @desc     Vote on a poll
// @access   Public
router.post("/vote/:id", async (req, res) => {
  try {
    let conditionUserOrIp;
    if (req.user) {
      conditionUserOrIp = {
        "options.votes.user": req.user.id
      };
    } else {
      conditionUserOrIp = {
        "options.votes.ip": req.ip
      };
    }

    const pullUserOrIp = {};
    if (req.user) pullUserOrIp.user = req.user.id;
    else pullUserOrIp.ip = req.ip;

    await Poll.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(req.params.id),
        ...conditionUserOrIp
      },
      {
        $pull: {
          "options.$.votes": pullUserOrIp
        }
      }
    );

    const pushUserOrIp = {};
    if (req.user) pushUserOrIp.user = req.user.id;
    else pushUserOrIp.ip = req.ip;

    const addConditions = [];
    addConditions.push({ _id: req.params.id });
    addConditions.push({ "options.optionName": req.body.optionName });

    const updatedPoll = await Poll.findOneAndUpdate(
      {
        $and: addConditions
      },
      {
        $push: {
          "options.$.votes": pushUserOrIp
        }
      },
      { new: true }
    );

    res.json(updatedPoll);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/polls/:id
// @desc     Remove poll by id
// @access   Private
router.delete("/:id", passportConfig.isAuthenticated, async (req, res) => {
  try {
    const poll = await Poll.findOneAndDelete({ _id: req.params.id });
    res.json(poll);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
