const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  githubId: {
    type: String
  },
  googleId: {
    type: String
  },
  profileImageUrl: {
    type: String
  }
});

module.exports = User = mongoose.model("user", UserSchema);
