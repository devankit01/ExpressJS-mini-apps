const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 3000 ;
// Initialise app
const app = express();

//  bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

// View engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static
app.use(express.static("public"));
app.use(express.json());

var works = [];
var data = {};

// Home - Get
app.get("/", (req, res) => {
  let date = new Date();
  let weekday = date.toLocaleString("default", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  res.render("list", { day: weekday, works: works });
});

app.post("/delete", (req, res) => {
  console.log(typeof req.body);
  data = req.body;
  data = Object.keys(data)[0];
  console.log(Object.keys(data)[0]);
  // console.log(data)
  works = works.filter((item) => item !== data);
  res.redirect("/");
});

// Home - Post
app.post("/", (req, res) => {
  let addWork = req.body.addWork;

  works.push(addWork);

  console.log(addWork);

  res.redirect("/");
});

app.listen(PORT, () => console.log("Server Started"));
