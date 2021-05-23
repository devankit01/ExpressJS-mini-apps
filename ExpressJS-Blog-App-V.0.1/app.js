const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const _ = require("lodash");
const PORT = process.env.PORT || 3000;

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

var posts = [];

// Routes
app.get("/", (req, res) => {
  res.render("Home", { posts: posts });
});

app.get("/about", (req, res) => {
  res.render("About");
});

app.get("/contact", (req, res) => {
  res.render("Contact");
});

app.get("/compose", (req, res) => {
    res.render("Compose");
  });

 


app.post("/compose", (req, res) => {
  const postBody = {
    title: req.body.title,
    body: req.body.post,
  };
  posts.push(postBody);
  // console.log(postBody)
  res.redirect("/");
});

app.get("/post/:title", (req, res) => {
  console.log(req.params.title);

  posts.forEach((post) => {
    let title = _.lowerCase(post.title);
    let requested = _.lowerCase(req.params.title);

    if (title === requested) {
      console.log("Match");
      console.log(post.title, post.body);
      res.render("Post", {
        posttitle: post.title,
        postbody: post.body,
      });
    } else {
      res.send("<h1>Not Found</h1>");
    }
  });
});

app.listen(PORT, (req, res) => console.log("Server Started"));
