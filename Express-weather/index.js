const express = require("express");
const https = require("https");

const app = express();

app.get("/", (req, res) => {
  https.get(
    "https://api.openweathermap.org/data/2.5/weather?q=Lucknow&units=metric&APPID=42b9eed7b043ca54cb3231dc33db2c69",
    (resp) => {
      console.log(resp.statusCode);

      resp.on("data", (data) => {
        data = JSON.parse(data);

        const temp = data.main.temp;
        const weather = data.weather[0].description;
        const icon = data.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon  + "@2x.png";
        console.log(temp, weather);

        res.write("<h1>Temperature : " + temp + "</h1>");
        res.write("<h3>Weather is  : " + weather + "</h3>");
        res.write("<img src='" + imageURL + "'>");

        res.send()
      });
    }
  );
  // res.send("Home");
});

app.listen(8080, (req, res) => console.log("Server Started"));
