let app = new Vue({
	el: '#exchange',
	data: {
		data: null,
		currencies: null,
		exg: "SEK",
		selectedFromCurrency: "SEK",
		selectedToCurrency: "USD",
		rate: "",
		inputAmount: 0,
		outputAmount: 0,

		partOne: "Part One",
		partTwo: "Part Two"
	},
	created() {
		this.changeExg("SEK");
	},
	mounted() {
		this.calculate(0);
		
	},
	methods: {
		getCurrencies: function (base) {
			axios.get(`https://api.exchangeratesapi.io/latest?base=${base}`)
				.then(response => (this.currencies = response.data.rates));
		},
		changeExg: function (newExg) {
			this.exg = newExg;
			this.getCurrencies(this.exg);
			console.log(this.exg)
		},

		getSpecificCurrencies: function (base) {
			axios.get(`https://api.exchangeratesapi.io/latest?base=${base}`)
				.then(response => (this.rate = response.data.rates[this.selectedToCurrency]));
		},
		

		calculate: function (input) {
		
			 this.getSpecificCurrencies(this.selectedFromCurrency);
			 input = this.inputAmount;
			 this.outputAmount = input * this.rate;

		},
		switchCurrencies: function(){
			//switch input
			const inputA = this.inputAmount;
			this.inputAmount = this.outputAmount;
			this.outputAmount = inputA;

            //Switch currency
			const selectedValue = this.selectedFromCurrency;
			this.selectedFromCurrency = this.selectedToCurrency;
			this.selectedToCurrency = selectedValue;
			
		}
	
	}
})
