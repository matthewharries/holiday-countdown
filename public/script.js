var app = new Vue({
	el: '#app',
	data: {
		currentTime: Math.trunc((new Date()).getTime() / 1000),
		dateToCalculate: 10000000,
		months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		selectedHoliday: "New Year's Day",
		holidayList: {},
		holiday: '',
		month: '',
		day: ''
	},
	created: function(){
		this.getHolidays();
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
	watch: {
		selectedHoliday : function(){
			var textDate = this.holidayList[this.selectedHoliday];
			var date = Date.parse(textDate);
			
			this.dateToCalculate = Math.trunc(date / 1000)
		}
	},
	methods: {
		getHolidays: function(){
			axios.get("http://localhost:3000/api/holiday").then(response => {
				this.holidayList = response.data;
				this.selectedHoliday = "New Year's Day";
				var textDate = this.holidayList[this.selectedHoliday];
				var date = Date.parse(textDate);
				this.dateToCalculate = Math.trunc(date / 1000)
				return true;
			}).catch(err => {
      });
		},
		addHoliday: function(){
			if (this.day == '' || this.day < 1 || this.day > 31 || isNaN(this.day)){
				alert("Please enter valid day")
				return;
			}
			if (this.month == ''){
				alert("Please select month")
				return;
			}
			
			var currentDate = new Date();
			var currentDay = currentDate.getDate();
			var currentMonth = currentDate.getMonth();
			var currentYear = currentDate.getFullYear();
			
			var dateToAdd;
			
			if((currentDay > this.day && currentMonth == this.months.indexOf(this.month)) || currentMonth < this.months.indexOf(this.month)){
				dateToAdd = new Date(this.month + this.day + ", " + currentYear);
			}else {
				dateToAdd = new Date(this.month + this.day + ", " + (currentYear + 1));
			}
			
			axios.post("http://localhost:3000/api/holiday",{
				name: this.holiday,
				date: dateToAdd
			}).then(response => {
				this.holiday = "";
				this.month = "January";
				this.day = "";
				this.getHolidays();
				return true;
      }).catch(err => {
      });		
		},
		startTimer: function(){
			window.setInterval(() => {
        this.currentTime = Math.trunc((new Date()).getTime() / 1000);
    	},1000);
		},
		changeHoliday: function(e) {
			this.selectedHoliday = e.target.innerHTML;
		}
	},
	mounted() {
		this.startTimer();
		this.dateToCalculate = Math.trunc(Date.parse(this.holidayList[this.selectedHoliday]) / 1000);
	},
	
});