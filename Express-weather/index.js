const express = require("express");
const https = require("https");
const bodyParser = require('body-parser')

const app = express();




app.use(bodyParser.urlencoded({extended : true}));




app.get("/", (req, res) => {

  res.sendFile(__dirname + "/index.html")
  // res.send("Home");
});





app.post("/", (req, res) => {


const apiKey = "42b9eed7b043ca54cb3231dc33db2c69";
const city = req.body.city ;
https.get(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`,
  (resp) => {
    console.log(resp.statusCode);

    resp.on("data", (data) => {
      data = JSON.parse(data);

      const temp = data.main.temp;
      const weather = data.weather[0].description;
      const icon = data.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      
      res.write("<h1>Temperature : " + temp + "</h1>");
      res.write("<h3>Weather : " + weather + "</h3>");
      res.write("<img src='" + imageURL + "'>");
    


      res.send();
    });
  }
);


});


app.listen(8080, (req, res) => console.log("Server Started"));





