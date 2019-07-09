const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GithubStrategy = require("passport-github").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const bcrypt = require("bcryptjs");
const config = require("config");

const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

/**
 * Authenticate user using email and password
 */
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` });
        }

        const isMatch = await bcrypt.compare(password, user.password || "");
        if (!isMatch) {
          return done(null, false, { msg: "Invalid credentials" });
        }

        return done(null, user);
      } catch (err) {
        console.dir(err);
        return done(err);
      }
    }
  )
);

/**
 * Authenticate using Github OAuth
 */
passport.use(
  new GithubStrategy(
    {
      clientID: config.get("githubClientId"),
      clientSecret: config.get("githubClientSecret"),
      callbackURL: "http://localhost:5000/api/auth/github/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const currentUser = await User.findOne({ githubId: profile.id });

        if (!currentUser) {
          const newUser = await new User({
            githubId: profile._json.id,
            profileImageUrl: profile._json.avatar_url || "",
            email: profile._json.email || "",
            name: profile._json.name || "",
            bio: profile._json.bio || ""
          }).save();

          if (newUser) {
            return done(null, newUser);
          }
        }

        done(null, currentUser);
      } catch (err) {
        done(err);
      }
    }
  )
);

/**
 * Authenticate using Google OAuth
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: config.get("googleClientId"),
      clientSecret: config.get("googleClientSecret"),
      callbackURL: "http://localhost:5000/api/auth/google/callback"
    },
    async (accesToken, refreshToken, profile, done) => {
      try {
        const currentUser = await User.findOne({ googleId: profile.id });

        // If new user, save him to db
        if (!currentUser) {
          const newUser = await new User({
            googleId: profile.id,
            email: profile._json.email || ""
          }).save();

          // Create a profile for user
          await new Profile({
            user: newUser.id,
            avatar: profile._json.picture,
            name: profile._json.name || ""
          }).save();

          return done(null, newUser);
        }
        // User already in db, login him
        done(null, currentUser);
      } catch (err) {
        console.error(err.message);
        done(err);
      }
    }
  )
);

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ msg: "Not authenticated" });
};
