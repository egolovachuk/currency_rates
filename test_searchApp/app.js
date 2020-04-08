var express = require("express");
var app = express();
var request = require ("request");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("search");
});

//
app.get("/results",(req, res) => {
	var s = req.query.search; //"search" comes from search.ejs name="search"
	var url = "http://www.omdbapi.com/?s="+s+"&apikey=thewdb";
	request(url, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			console.log(body);
			var data = JSON.parse(body);
			res.render("results", {data: data});
		}
	})
});

app.listen(3000, () => {
	console.log("Search App server up and listening 3000");
} );