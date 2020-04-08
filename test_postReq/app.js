var express = require("express");
var bodyParser = require("body-parser");
var app = express();

//express.js settings section start
app.set("view engine", "ejs");
app.use(express.static("public"));//to use separate folder for css and other scripts files
app.use(bodyParser.urlencoded({extended: true})) //telling express to use body-parser
//express.js settings section end

var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];

app.get("/",function(req,res){
	res.render("home"); //no need to put the home.ejs ext since we have "view engine" set above
});

app.get("/friends", function(req, res){
	res.render("friends", {friends: friends});
});

app.post("/add", function(req, res){
	var newFriend = req.body.friendName;
	friends.push(newFriend);
	res.redirect("/friends"); 
});

app.listen(3000, function(){console.log("The POST REQ demo server is up and listening on 3000")});