let app = new Vue({
	el: '#exchange',
	data: {
		data: null,
		currencies: null,
		exg: "SEK",
		selectedFromCurrency: "SEK",
		selectedToCurrency: "USD",
		inputAmount: 0,
		outputAmount: 0,

		partOne: "Part One",
		partTwo: "Part Two"
	},
	created() {

		this.changeselectedFromC("SEK");
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
			console.log("Change selected to :: ",newValue )
		},
		calculateFrom: function (value,currancy) {
			this.selectedFromCurrency = currancy;
			this.calculate(value);

		},

		calculateTo: function (value, currancy) {
			this.selectedToCurrency = currancy;
			this.calculate(value);

		},

		calculate: function (value) {
			var value = parseFloat(value);
			if (this.selectedFromCurrency && this.selectedToCurrency) {
				this.inputAmount = value;
				this.outputAmount = (value * this.inputAmount).toFixed(2);
			}
		},
		// updateInputs: function () {
		// 	var selected;
		// 	for (i = 0; i < this.currencies.length; i++) {
		// 		if (this.selectedFromCurrency == this.currencies[i]) {
		// 			selected = this.currencies[i];
		// 		}
		// 	}
		// 	this.currencies = selected.rate;

		// 	var input2 = parseFloat(document.getElementById("inputAmount").value);
		// 	if (isNaN(input2)) {
		// 		this.inputAmount = "";
		// 		this.outputAmount = "";
		// 		return;
		// 	}
		// 	this.outputAmount = (input2 * this.currencies).toFixed(2);
		// },
	}
})
