const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const Mailchimp = require("mailchimp-api-v3");
const mailchimp = new Mailchimp("xxxxxxxxxxxxxxxxxxxxxxxxxxxxx-us6"); // API-Key



const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  mailchimp
    .post("/lists/xxxxxxxxxxx/members", { // Include Your id
      email_address: req.body.email,
      merge_fields: {
        FNAME: req.body.firstName,
        LNAME: req.body.lastName,
      },

      status: "subscribed",
    })
    .then(function (results) {
      console.log(results);
    })
    .catch(function (err) {
      console.log(err);
    });

  res.sendFile(__dirname + "/success.html");
});

app.listen(8080, (req, res) => console.log("Server Started"));

