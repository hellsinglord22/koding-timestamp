'use strict'

// ^ inject dependencies ^_^ // 
const express = require('express'); 
const moment  = require('moment'); 
const app     = express(); 


// ^_^ constants  ^_^ // 
const DEFAULT_PORT = process.env.PORT || 5000; 

// Get Input and do your process // 
app.param('time', function(request, response, next, id) {

	let time = null; 
		console.log(id);
		if (isNaN(id)) {
			// if it's not a number then use moment format // 
			time = moment(id, 'MMMM DD, YYYY');
			request.time = (time.isValid()) ? time : null;  
		} else {
			// if it's a number then this is a unix time format // 
			time = moment.unix(parseInt(id))
			request.time = time;
		}

		

    next(); 
}); 

 // print the output //
app.get('/:time', function(request, response) {

	let unix = null; 
	let natrual =null; 
	const time = request.time; 

	if (time) {
		unix = time.format('X'); 
		natrual = time.format('MMMM DD, YYYY'); 
	}


	const timeJsonObject = {
		unix: unix, 
		natrual: natrual
	}; 

	response.send(JSON.stringify(timeJsonObject)); 

}); 

app.get('/', function(request, response) {
	response.sendFile(__dirname + '/index.html'); 
});

app.listen(Number(DEFAULT_PORT)); 
console.log('listening on port ', DEFAULT_PORT); 
