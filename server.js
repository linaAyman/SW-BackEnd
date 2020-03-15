//grab our dependency 
require('dotenv').config();
const express =require('express'),
app=express(),
port =process.env.PORT||8040, //port that server will listen too
expresslayout=require('express-ejs-layouts'),
seeder = require('mongoose-seed'),
mongoose=require('mongoose');

//configure app
//tell express where to look for static assets
app.use(express.static(__dirname+'/public'));

app.set('view engine','ejs');
app.use(expresslayout);
//set the routes
//connect to our database


app.use(require('./startup/routes'));

//start our server
app.listen(port,()=>{
console.log(`App listening on http://localhost :${port}`);
});