var express = require ("express");
var app = express();

app.use(express.static("public")); //this is needed to make the use of public folder (containig e.g css-styles files) possible 

app.set("view engine","ejs"); //allows us not to add ejs ext to the ejs files when refering to them below (home, choice, etc.)
//defining a 'home' route
app.get("/", function(req,res){
	res.render("home"); //this needs to be put into the views directory
})
//defining a 'choice' route that takes a variable in the query parameter
app.get("/fav/:choice", function(req,res){
	var choice = req.params.choice;
	res.render("choice", {tmpChoice: choice});
});
//defining a 'comments' route that prints the comments from an array
app.get("/comments",function(req, res){
	var comments = [
		{title: "I love bunnies", author: "Leyla"},
		{title: "I love dogs", author: "Mrs. Golf"},
		{title: "I love cakes", author: "Lelya"}
	];
	res.render("comments", {comments: comments});
});

app.listen(3000, function(){
		   console.log("Server is up and running at port 3000");
		   })