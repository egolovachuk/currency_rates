var express = require("express");
var routes = express();

// "/" -> Welcome to my assignment!
routes.get("/",function(req, res){
	res.send("Welcome to my assignment!");
});

// "/speak/:animal" -> speaks 
routes.get("/speak/:animal", function(req, res){
	var animal = req.params.animal.toLowerCase();
	var speeches = {
		pig: "Oink",
		dog: "Woof",
		cat: "Meow",
		rabbit: "Frr"
	}
	var speech = speeches[animal];
	res.send("The "+animal+" says "+speech);
});

// "repeat/:phrase/:times" -> repeats
routes.get("/repeat/:phrase/:times", function(req, res){
	var phrase = req.params.phrase;
	var times = Number(req.params.times);
	var message = "";
	console.log(typeof(times));
	for (i=0; i<times; i++){
		message += phrase+ " ";
	}
	res.send(message);
});

// "*" -> "Sorry, but... What are you doing with your life?
routes.get("*",function(req, res){
	res.send("Sorry, but... What are you doing with your life?");
});



routes.listen(3000, function(){
	console.log("Server is up on port 3000");
});