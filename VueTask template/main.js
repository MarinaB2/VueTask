let app = new Vue({
	el: '#exchange',
	data: {
		data: null,
		currencies: null,
		exg: "SEK",
		selectedFromCurrency: "SEK",
		selectedToCurrency: "USD",
		selectedRates:[],
		inputAmount: 0,
		outputAmount: 0,

		partOne: "Part One",
		partTwo: "Part Two"
	},
	created() {

		// this.changeselectedFromC("SEK");
		// this.changeselectedToC("USD");
		
	},
	mounted() {
		this.changeExg("SEK");
	},
	methods: {
		getCurrencies: function (base) {
			axios.get(`https://api.exchangeratesapi.io/latest?base=${base}`)
				.then(response => (this.currencies = response.data.rates));
		},
		changeExg: function (newExg) {
			this.exg = newExg;
			this.getCurrencies(this.exg);
		},

		changeselectedFromC: function (newValue) {
			this.selectedFromCurrency = newValue;
			this.getCurrencies(this.selectedFromCurrency);

		},
		changeselectedToC: function (newValue) {
			this.selectedToCurrency = newValue;
			this.getCurrencies(this.selectedToCurrency);
		},
		calculateFrom: function (value) {
			this.inputAmount = value;
			this.calculate(true);

		},

		calculateTo: function (value) {
			this.outputAmount= value;
			this.calculate(false);
		},

		calculate: function (isfocused) {

		const selected = this.getCurrencies(this.selectedFromCurrency);
			if (isfocused) {
				this.outputAmount = this.inputAmount * selected.rate;
			}else{
				this.inputAmount = this.outputAmount / this.currencies.rate;
			}
		},
	
	}
})
