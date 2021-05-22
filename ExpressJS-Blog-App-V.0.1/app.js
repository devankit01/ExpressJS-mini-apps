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


// Routes
app.get('/', (req,res) => {
    res.render('Home')
})

app.listen(PORT , (req, res) => console.log('Server Started'))