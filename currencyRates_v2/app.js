var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
	http = require("http"),
	https = require("https");
	xmlParser = require("xml2json"); //parses XML string to a JSON object

app.set("view engine","ejs");
app.use(express.static("public"));//to use separate folder for css and other scripts files
app.use(bodyParser.urlencoded({extended: true})) //telling express to use body-parser

var dateStart;
var dateEnd;


//home route
app.get("/", (req, res) => {
	res.render("home");
});

// //date entering route
// app.post("/", (req, res) => {
	
// });


//currency route
app.get("/currency", (req, res) => { 

	console.log(req.query.dateStart, req.query.dateEnd);

		dateStart = req.query.dateStart;
		dateEnd = req.query.dateEnd;
		console.log("Params worked: "+dateStart, dateEnd);
	
	

	//date formatting for CBR query composing ("01-31-2020" to 31/01/2020)
	function formatDate(date) {                
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();
	
		if (month.length < 2) 
			month = '0' + month;
		if (day.length < 2) 
			day = '0' + day;
	
		return [day, month, year].join('/');
	}
	var dateCbr1 = formatDate(dateStart);
	var dateCbr2 = formatDate(dateEnd);
	var url = `http://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=${dateCbr1}&date_req2=${dateCbr2}&VAL_NM_RQ=R01235`;
	var xmlBody = "";
	var jsonBody;
	var dataPoints = [];

	console.log(url);
		
	//Promises logic part 1
	var request = new Promise((resolve, reject) => { 
		http.get(url, res => {
		
		res.setEncoding("utf8");
		
		res.on("data", data => {
			xmlBody += data;
			});
		 
		res.on("end", () => {			
			jsonBody = xmlParser.toJson(xmlBody);
			jsonBody = JSON.parse(jsonBody);
			
			//Cretaing pairs for dataPoints array
			jsonBody.ValCurs.Record.forEach(function(pair){
			var x = pair.Date;
			var y = pair.Value;
			
			// Replacing the textual comma
			var comma = y.search(",");
			var yFirst = y.slice(0,comma); 
			var ySecond = y.slice(comma+1,-1);
			var yRes = yFirst+"."+ySecond;
		
			//Pushing an object to the dataPoints array parsing the floating value
			resolve(dataPoints.push({x: x, y: parseFloat(yRes)}));
			});
			}
		)
		});
	});
	
	//Promises logic part 2
	request.then(()=>{
		res.send(dataPoints)	
	});
	
});



//oil route
app.get("/oil", (req, res) => {
	
	var url = "https://pkgstore.datahub.io/core/oil-prices/brent-daily_json/data/c8ba0489f78f29fbb3583c1ce618c98a/brent-daily_json.json";
	var jsonBody = "";
	var dataPoints = [];

		//Promises logic part 1
		var request = new Promise((resolve, reject) => { 
			https.get(url, res => {
			
				res.setEncoding("utf8");
				
				res.on("data", data => {	
					jsonBody += data
					});
				
				res.on("end", () => {
					jsonBody = JSON.parse(jsonBody);
					jsonBody.forEach((pair) => {
						var x = pair.Date;
						var y = pair.Price;
						dataPoints.push({
							x: x, 
							y: parseFloat(y)})
							});

					setTimeout(resolve, 1000);
					});
				});
		});

		//Promises logic part 2
		request.then(() => {
			res.send(dataPoints)
			});
});




app.listen(3000, () => {
	console.log("Currency Rates App Server up and listen to port 3000 at " + Date());
});