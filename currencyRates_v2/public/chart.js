 //chartInit was used here in accordance to https://ru.stackoverflow.com/questions/514284/

	//chartInit opening bracket
	//var chartInit = (usdData) => {  
		
		//Apexchart options array	
		
		var options = {
		chart: {
			height: 350,
			type: 'line',
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
		}
	}
	
	var chart = new ApexCharts(document.querySelector("#chart"), options);
	
	//Updating the 'series' array of var options below with given dataPoints, fetched from the /chart root
	
		//fetching data from the currency route logic
	$.getJSON('/currency', function(response) {
	chart.updateSeries([{
	name: 'USD',
	data: response
	}])
	});

		//fetching data from the oil route logic
	$.getJSON('/oil', function(response) {
	chart.appendData([{
	name: 'EUR',
	data: response
	}])
	});
	
	
	
		//deprecated - usdData variable was defined through the chartInit function parameter	
	// chart.updateSeries ([{
	// name: 'USD',
	// data: usdData
	// }])
	
	//Apexchart rendering function
	chart.render();

//chartInit closing bracket	
// }; 

		