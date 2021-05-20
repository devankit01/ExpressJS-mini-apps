const express = require('express')
const bodyParser = require('body-parser')
const app = express()


app.use(bodyParser.urlencoded({extended : true}));


app.get('/' ,(req, res) =>{
    res.sendFile(__dirname + "/index.html")
})

app.get('/bmi' ,(req, res) =>{
    res.sendFile(__dirname + "/bmi.html")
})

app.post('/' , (req, res) => {
   
    console.log(req.body.input1,req.body.input2)
    var num1 = Number(req.body.input1) ;
    var num2 = Number(req.body.input2) ;

    var num = num1 + num2;
    console.log(num)
    res.send("Result : " + num);
})

app.post('/bmicalculator' , (req, res) => {
   

    var weight = parseFloat(req.body.weight) ;
    var height = parseFloat(req.body.height) ;

    var bmi = weight / (height*height)
    res.send("Result : " + bmi);
})


app.listen(3000, (req, res) => console.log('Server Started'))