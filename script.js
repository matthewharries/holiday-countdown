var app = new Vue({
	el: '#app',
	data: {
		currentTime: Math.trunc((new Date()).getTime() / 1000),
		dateToCalculate: Math.trunc((new Date()).getTime() / 1000) + 100000,
		holidayList: {
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
		}
	},
	computed: {
		seconds: function() {
        return (this.dateToCalculate - this.currentTime) % 60;
    },

    minutes: function() {
        return Math.trunc((this.dateToCalculate - this.currentTime) / 60) % 60;
    },

    hours: function() {
        return Math.trunc((this.dateToCalculate - this.currentTime) / 60 / 60) % 24;
    },

    days: function() {
        return Math.trunc((this.dateToCalculate - this.currentTime) / 60 / 60 / 24);
    }
	},
	methods: {
		startTimer: function(){
			window.setInterval(() => {
        this.currentTime = Math.trunc((new Date()).getTime() / 1000);
    	},1000);
		}
	},
	mounted() {
		this.startTimer();
	},
	
});