//jshint esversion:6

// Requiring module
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();


const wmlRoutes = require("./routes/api/wml");
app.use("/api/wml", wmlRoutes);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));

//Set public as static directory

app.use(express.static("public"));

app.set("views", path.join(__dirname, "/views"));

//  Use ejs as template engine
app.set("view engine", "ejs");


// // Render main template
app.get("/", (req, res) => {
  res.render("home");
});

// Server setup
app.listen(process.env.PORT || 3000, () => {
  console.log("The server started running on port 3000");
});
