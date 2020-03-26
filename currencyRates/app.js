var express = require("express");
var app = express();
var request = require("request");

app.set("view engine","ejs");

//chart route
app.get("/", (req,res) => {
	//code here
	var url = "http://www.omdbapi.com/?s=california&apikey=thewdb";
	request(url, (error, response, body)=>{
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			console.log(data);
			res.render("home", {data: data});
		}
	})
});

app.listen(3000, () => {
	console.log("Currency Rates App Server up and listen to port 3000");
});