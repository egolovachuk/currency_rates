 //chartInit was used here in accordance to https://ru.stackoverflow.com/questions/514284/
	var xaxis = [];
	var data1 = [];
	var data2 = [];
	//chartInit opening bracket
	//var chartInit = (usdData) => {  
		
		//Apexchart options array	
		
		var options = {
		chart: {
			height: 350,
			type: 'area',
		},
		dataLabels: {
			enabled: false
		},
		series: [], //this array is to be updated with the updateSeries function below
		title: {
			text: 'USD (RUB)',
		},
		noData: {
		text: 'Loading...'
		},
		tooltip: {
        	x: 
			{
				format: 'dd/MM/yy HH:mm'
			},
        },
		stroke: 
			{
				curve: 'smooth'
			}	
	}
	
	var chart = new ApexCharts(document.querySelector("#chart"), options);
	 
	//Updating the 'series' array of var options below with given dataPoints, fetched from the /chart root
	
		//fetching data from the currency route logic
	$.getJSON('/currency', function(response) {
		for (i=0; i<response.length; i++) {
			xaxis.push(response[i].x);
		}
		console.log(xaxis);
		for (i=0; i<response.length; i++) {
			data1.push(response[i].y);
		}
		console.log(data1);
		chart.updateSeries([{
		name: 'USD',
		data: data1
		}]);
		
		chart.updateOptions({
		xaxis: {
          type: 'datetime',
          categories: xaxis
        }
		});
	});

	$.getJSON('/oil', function(response) {
		for (i=0; i<response.length; i++) {
			data2.push(response[i].y);
		}
		console.log(data2);
		chart.appendSeries({
		name: 'EUR',
		data: data2
		})
	});


		//fetching data from the oil route logic
	// // $.getJSON('/oil', function(response) {
	// // chart.appendData([{
	// // name: 'EUR',
	// // data: response
	// }])
	// });
	
	
	
		//deprecated - usdData variable was defined through the chartInit function parameter	
	// chart.updateSeries ([{
	// name: 'USD',
	// data: usdData
	// }])
	
	//Apexchart rendering function
	chart.render();

//chartInit closing bracket	
// }; 

		