const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "Subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };

  var jsondata = JSON.stringify(data);


  url = "https://us6.api.mailchimp.com/3.0/lists/?id=71aec5dd6a/members/";

  const options = {
    method: "POST",
    auth: "devankit:840cea6730713c2e6d8bab4bb2849489-us6",
  };

  const request = https.request(url, options, (response) => {
    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsondata);
  request.end();
});

app.listen(8080, (req, res) => console.log("Server Started"));

// id = ''
// api = ''
