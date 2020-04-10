var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    http = require("http"),
	xmlParser = require("xml2json"); //parses XML string to a JSON object

app.set("view engine","ejs");
app.use(express.static("public"));//to use separate folder for css and other scripts files
app.use(bodyParser.urlencoded({extended: true})) //telling express to use body-parser

//home route
app.get("/", (req, res) => {
	res.render("home");
});

//currency route
app.get("/currency", (req, res) => { 
	
	var url = "http://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=01/03/2019&date_req2=16/03/2020&VAL_NM_RQ=R01235";
	var xmlBody = "";
	var jsonBody;
	var dataPoints = [];
	
	//Promises logic part 1
	var request = new Promise((resolve, reject) => { 
		http.get(url, res => {
		
		res.setEncoding("utf8");
		
		res.on("data", data => {
			xmlBody += data;
			//console.log(`XML `, typeof(body), `: ${body}`)
			});
		 
		res.on("end", () => {			
			jsonBody = xmlParser.toJson(xmlBody);
			jsonBody = JSON.parse(jsonBody);
			//console.log(jsonBody.ValCurs.Record);
			
			//Cretaing pairs for dataPoints array
			jsonBody.ValCurs.Record.forEach(function(pair){
			var x = pair.Date;
			var y = pair.Value;
			
			// Splicing "y" into two parts, removing the textual comma from "y" 
			// and replacing it with numeric comma
			var comma = y.search(",");
			// Getting the textual comma position and  "y" partitioning
			var yFirst = y.slice(0,comma); 
			var ySecond = y.slice(comma+1,-1);
			// Inserting the numeric comma
			var yRes = yFirst+"."+ySecond;
		
			//Pushing an object to the dataPoints array parsing the floating value
			resolve(dataPoints.push({x: x, y: parseFloat(yRes)}));
			});
			
			//console.log("From promise:"+ dataPoints);
			}
		)
		});
	});
	
	//Promises logic part 2
	request.then(()=>{ 
		res.send(dataPoints);
		// res.render("home", {
		// 	dataPoints: JSON.stringify(dataPoints)
		// });
		//console.log(dataPoints);
	});
	
});

//oil route
app.get("/oil", (req, res) => { 
	
	var url = "http://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=01/03/2019&date_req2=16/03/2020&VAL_NM_RQ=R01239";
	var xmlBody = "";
	var jsonBody;
	var dataPoints = [];
	
	//Promises logic part 1
	var request = new Promise((resolve, reject) => { 
		http.get(url, res => {
		
		res.setEncoding("utf8");
		
		res.on("data", data => {
			xmlBody += data;
			//console.log(`XML `, typeof(body), `: ${body}`)
			});
		 
		res.on("end", () => {			
			jsonBody = xmlParser.toJson(xmlBody);
			jsonBody = JSON.parse(jsonBody);
			//console.log(jsonBody.ValCurs.Record);
			
			//Cretaing pairs for dataPoints array
			jsonBody.ValCurs.Record.forEach(function(pair){
			var x = pair.Date;
			var y = pair.Value;
			
			// Splicing "y" into two parts, removing the textual comma from "y" 
			// and replacing it with numeric comma
			var comma = y.search(",");
			// Getting the textual comma position and  "y" partitioning
			var yFirst = y.slice(0,comma); 
			var ySecond = y.slice(comma+1,-1);
			// Inserting the numeric comma
			var yRes = yFirst+"."+ySecond;
		
			//Pushing an object to the dataPoints array parsing the floating value
			resolve(dataPoints.push({x: x, y: parseFloat(yRes)}));
			});
			
			//console.log("From promise:"+ dataPoints);
			}
		)
		});
	});
	
	//Promises logic part 2
	request.then(()=>{ 
		return res.send(dataPoints);
		// res.render("home", {
		// 	dataPoints: JSON.stringify(dataPoints)
		// });
		//console.log(dataPoints);
	});
	
	
});

app.listen(3000, () => {
	console.log("Currency Rates App Server up and listen to port 3000 at " + Date());
});