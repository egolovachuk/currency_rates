//Chart script provided by Apexchart (https://apexcharts.com/docs/update-charts-from-json-api-ajax/#)

window.onload = () => {
//getting data from the JSON logic
	var url = "http://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=12/03/2020&date_req2=16/03/2020&VAL_NM_RQ=R01235";
	var dataPoints = [];

	$.get(url, (data) => {
		$(data).find("Record").each(()=> {
			var $dataPoint = $(this);
			var x = $dataPoint.attr("Date");
			var y = $dataPoint.find("Value").text();

			// Splicing "y" into two parts, removing the textual comma from "y" 
			// and replacing it with numeric comma
			var comma = y.search(",");
			// Getting the textual comma position and  "y" partitioning
			const yFirst = y.slice(0,comma); 
			var ySecond = y.slice(comma+1,-1);
			// Inserting the numeric comma
			var yBoth = yFirst+"."+ySecond;
	
			//Just debugging
			//console.log("Type of xBoth: "+typeof(yBoth)+" "+yBoth);
			
			//Pushing into the array
			dataPoints.push({x: parseFloat(x), y: parseFloat(yBoth)});
	
	
	// var url = 'rates.json';
	// var dataPoints = [];
 
	// $.getJSON(url, function(response) {
	// 	// console.log(response.Record);
	// 	response.Record.forEach(function(pair){
	// 		var x = pair._Date;
	// 		var y = pair.Value;
			
	// 		// Splicing "y" into two parts, removing the textual comma from "y" 
	// 		// and replacing it with numeric comma
	// 		var comma = y.search(",");
	// 		// Getting the textual comma position and  "y" partitioning
	// 		const yFirst = y.slice(0,comma); 
	// 		var ySecond = y.slice(comma+1,-1);
	// 		// Inserting the numeric comma
	// 		var yBoth = yFirst+"."+ySecond;
		
	// 		//Pushing an object to the dataPoints array parsing the floating value
	// 		dataPoints.push({x: x, y: parseFloat(yBoth)});
	// 		});
			}
		)
	});
			//Updating the 'series' array of var options below with given dataPoints
			chart.updateSeries(
		  		[
		  			{
						name: 'Rates',
						data: dataPoints
					}
		  		]
		 );
	console.log(dataPoints);

		
	

	var options = {
		chart: {
			height: 350,
			type: 'line',
		},
		dataLabels: {
			enabled: false
		},
		series: [],
		title: {
			text: 'Rates',
		},
		noData: {
		text: 'Loading...'
		}
	}
	
	var chart = new ApexCharts(
		document.querySelector("#chart"),
		options
	);
	
	chart.render();
}
	
	// var url = 'rates.json';

	// $.getJSON(url, function(response) {
	// chart.updateSeries([{
	// 	name: 'Sales',
	// 	data: response
	// }])
	// });

	//chart script itself
	// var options = {
	// 	series: [],
	// 	chart: {
	// 	type: 'area',
	// 	stacked: false,
	// 	height: 350,
	// 	zoom: {
	// 	  type: 'x',
	// 	  enabled: true,
	// 	  autoScaleYaxis: true
	// 	},
	// 	toolbar: {
	// 	  autoSelected: 'zoom'
	// 	}
	//   },
	//   dataLabels: {
	// 	enabled: false
	//   },
	//   markers: {
	// 	size: 0,
	//   },
	//   title: {
	// 	text: 'Stock Price Movement',
	// 	align: 'left'
	//   },
	//   fill: {
	// 	type: 'gradient',
	// 	gradient: {
	// 	  shadeIntensity: 1,
	// 	  inverseColors: false,
	// 	  opacityFrom: 0.5,
	// 	  opacityTo: 0,
	// 	  stops: [0, 90, 100]
	// 	},
	//   },
	//   yaxis: {
	// 	labels: {
	// 	  formatter: function (val) {
	// 		return (val / 1000000).toFixed(0);
	// 	  },
	// 	},
	// 	title: {
	// 	  text: 'Price'
	// 	},
	//   },
	//   xaxis: {
	// 	type: 'datetime',
	//   },
	//   tooltip: {
	// 	shared: false,
	// 	y: {
	// 	  formatter: function (val) {
	// 		return (val / 1000000).toFixed(0)
	// 	  }
	// 	}
	//   }
	//   };

	//   var chart = new ApexCharts(document.querySelector("#chart"), options);
	//   chart.render();





//Chart script provided by Chart.js (https://www.chartjs.org)

// window.onload = function() {
// 	var dataPoints = [];

// 	$.get("rates.xml", function(data) {
// 		$(data).find("Record").each(function () {
// 			var $dataPoint = $(this);
// 			var x = $dataPoint.attr("Date");
// 			var y = $dataPoint.find("Value").text();
// 			// Splicing "y" into two parts, removing the textual comma from "y" 
// 			// and replacing it with numeric comma
// 			var comma = y.search(",");
// 			// Getting the textual comma position and  "y" partitioning
// 			const yFirst = y.slice(0,comma); 
// 			var ySecond = y.slice(comma+1,-1);
// 			// Inserting the numeric comma
// 			var yBoth = yFirst+"."+ySecond;
// 			//Just debugging
// 			console.log("Type of xBoth: "+typeof(yBoth)+" "+yBoth);
// 			dataPoints.push({x: parseFloat(x), y: parseFloat(yBoth)});

//     var ctx = document.getElementById('myChart').getContext('2d');
//     var chart = new Chart(ctx, {
//         // The type of chart we want to create
//         type: 'line',
//         // The data for our dataset
//         data: {
//             datasets: [{
//                 label: 'My First dataset',
//                 data: dataPoints
//             }]
//         },
//         // Configuration options go here
//         options: {}
// 	});
// })})}



// Chart script provided by CanvasJS (https://canvasjs.com)

// window.onload = function() {
// 	var dataPoints = [];

// 	$.get("rates.xml", function(data) {
// 		$(data).find("Record").each(function () {
// 			var $dataPoint = $(this);
// 			var x = $dataPoint.attr("Date");
// 			var y = $dataPoint.find("Value").text();
// 			// Splicing "y" into two parts, removing the textual comma from "y" 
// 			// and replacing it with numeric comma
// 			var comma = y.search(",");
// 			// Getting the textual comma position and  "y" partitioning
// 			const yFirst = y.slice(0,comma); 
// 			var ySecond = y.slice(comma+1,-1);
// 			// Inserting the numeric comma
// 			var yBoth = yFirst+"."+ySecond;
// 			//Just debigging
// 			console.log("Type of xBoth: "+typeof(yBoth)+" "+yBoth);
// 			dataPoints.push({x: parseFloat(x), y: parseFloat(yBoth)});
// 			console.log("Type of y: "+typeof(y)+" "+y);
// 			console.log(dataPoints);
			
// 		});
		
// 		var chart = new CanvasJS.Chart("chartContainer", {
			
// 			axisY:{
// 				minimum: 60
// 			},
// 			axisX:{
// 				maximum: 31
// 			},
// 			data: [{
// 			    type: "line",
// 			    dataPoints: dataPoints,
// 			  }]
// 		});
		
// 		chart.render();
// 	});