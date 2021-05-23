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



var posts = [];


// Routes
app.get('/', (req,res) => {
    
    res.render('Home',{'posts' : posts})
})

app.get('/about', (req,res) => {
    res.render('About')
})

app.get('/contact', (req,res) => {
    res.render('Contact')
})


app.get('/compose', (req,res) => {
    res.render('Compose')
})


app.post('/compose', (req,res) => {

    const postBody = {
        'title' : req.body.title,
        'body' : req.body.post
    }
    posts.push(postBody)
    console.log(postBody)
    res.redirect('/')
})

app.listen(PORT , (req, res) => console.log('Server Started'))