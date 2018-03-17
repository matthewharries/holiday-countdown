const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));

let holidayList = {
	"New Year's Day" : 'January 1, 2019', 
	"Martin Luther King, Jr. Day": 'January 15, 2019',
	"George Washington's Birthday": 'February 19, 2019',
	"Memorial Day" :'May 28, 2018',
	"Independence Day" : 'July 4, 2018', 
	"Labor Day": 'September 3, 2018',
	"Columbus Day": 'October 8, 2018',
	"Veteran's Day" :'November 12, 2018',
	"Thanksgiving Day": 'November 22, 2018',
	"Christmas Day" :'December 25, 2018'
};
	
app.post('/api/holiday', (req, res) => {
	var holidayName = req.body.name;
	var date = req.body.date;
	
	if(holidayName == undefined || date == undefined){
		res.status(400).send("Sorry, invalid date or holiday");
    return;
	}
	holidayList[holidayName] = date;
	res.sendStatus(200);
});

app.get('/api/holiday', (req, res) => {
  res.send(holidayList);
});


app.listen(3000, () => console.log('Server listening on port 3000!'));