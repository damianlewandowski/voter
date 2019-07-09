const express = require("express");
const router = express.Router();
const passportConfig = require("../../config/passport");
const Profile = require("../../models/Profile");
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: "public/images/uploads/",
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  })
});

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get("/me", passportConfig.isAuthenticated, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id }).populate(
      "user",
      ["name"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error("Error", err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/profile
// @desc     Create or Update user
// @access   Private
router.post("/", passportConfig.isAuthenticated, async (req, res) => {
  const {
    website,
    location,
    avatar,
    bio,
    position,
    name,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram
  } = req.body;

  console.dir(req.body);

  const profileFields = {};
  // profileFields.user = req.user._id;

  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (avatar) profileFields.avatar = avatar;
  if (bio) profileFields.bio = bio;
  if (position) profileFields.position = position;
  if (name) profileFields.name = name;

  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // Update
      const updatedProfile = await Profile.findOneAndUpdate(
        {
          user: req.user.id
        },
        {
          $set: profileFields
        },
        { new: true }
      );

      return res.json(updatedProfile);
    }

    // Create
    const newProfile = await new Profile(profileFields).save();

    res.json(newProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/avatar", upload.single("avatar"), async (req, res) => {
  const { filename } = req.file;

  try {
    const profile = await Profile.findOneAndUpdate(
      {
        user: req.user.id
      },
      {
        $set: {
          avatar: filename
        }
      },
      { new: true }
    );

    res.json(profile);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
