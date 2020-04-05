var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    http = require("http"),
	xmlParser = require("xml2json"); //parses XML string to a JSON object

app.set("view engine","ejs");
app.use(express.static("public"));//to use separate folder for css and other scripts files
app.use(bodyParser.urlencoded({extended: true})) //telling express to use body-parser

//chart route
app.get("/", (req, res) => {
	
	var url = "http://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=12/03/2020&date_req2=16/03/2020&VAL_NM_RQ=R01235";
	var body = "";
	var jsonBody;
	
	http.get(url, res => {
		
		res.setEncoding("utf8");
		
		res.on("data", data => {
			body += data;
			//console.log(`XML `, typeof(body), `: ${body}`)
			});
		 
		res.on("end", () => {
			
			jsonBody = xmlParser.toJson(body);
			jsonBody = JSON.parse(jsonBody);
			console.log(jsonBody);
			}
		)
	});
	
	res.render("home", {"jsonBody": jsonBody});
});

app.listen(3000, () => {
	console.log("Currency Rates App Server up and listen to port 3000");
});