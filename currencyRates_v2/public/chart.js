//dateSet was used here in accordance to https://ru.stackoverflow.com/questions/514284/
	
//dateSet opening bracket
const dateSet = (dateStart, dateEnd) => {  

		console.log(dateStart, dateEnd);
		
		var xaxis = [];
		var data1 = [];
		var data2 = [];

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
		},
		stroke: 
			{
				curve: 'smooth'
			}	
	}
	
	var chart = new ApexCharts(document.querySelector("#chart"), options);
	 
	//Updating the 'series' array of var options below with given dataPoints, fetched from the /chart root
	
		//fetching data from the currency route logic
		

			var url = "/currency";              //?dateStart=${dateStart}&dateEnd=${dateEnd}
			console.log(url);

			$.getJSON(url, function(response) {

				// function formatDate(date) {                
				// 		day = date.slice(0,2);
				// 		month = date.slice(3,5);
				// 		year = date.slice(6,10);
				
				// 	if (month.length < 2) 
				// 		month = '0' + month;
				// 	if (day.length < 2) 
				// 		day = '0' + day;
				
				// 	return [year, month, day].join('-');
				// }

				// for (i=0; i<response.length; i++) {
				// 	date = formatDate(response[i].x);
				// 	xaxis.push(date);
				// }
				// console.log(xaxis);
				// for (i=0; i<response.length; i++) {
				// 	data1.push(response[i].y);
				// }
				console.log(response);
				chart.updateSeries([{
				name: 'USD',
				data: response
				}]);
				
				// chart.updateOptions({
				// xaxis: {
				//   type: 'datetime',
				//   categories: xaxis
				// }
				// });
			});
		

		
			$.getJSON('', function(response) {	
				
				// response.forEach((point) => {
				// 	xaxis.forEach((xax) => {
				// 		if (point.x == xax)
				// 			// console.log(point.y);
				// 			data2.push({x: point.x, y: point.y});	
				// 			else if (point.x !== xax)
				// 			{
				// 				data2.push
				// 			}
				// 	}) 		
				// });
				//console.log(data2);
				chart.appendSeries({
				name: 'OIL',
				data: response
				})
			});	 
				
	chart.render();

//dateSet closing bracket	
}; 

		