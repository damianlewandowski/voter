const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cookieSession = require("cookie-session");

const app = express();

// Connect Database
connectDB();

/**
 * Init Middleware
 */
app.use(
  cookieSession({
    name: "session",
    keys: ["thisappisawesome"],
    maxAge: 24 * 60 * 60 * 100
  })
);
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "anything" }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

require("./models/User");
require("./config/passport");

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/polls", require("./routes/api/polls"));

// Serve images from paths like localhost:5000/:img_path
app.use(express.static(path.resolve("public/images/uploads/")));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
