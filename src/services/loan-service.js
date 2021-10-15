let cacheProvider = require("../providers/cache-provider");
const CACHE_DURATION = 60000;
const CACHE_KEY = "LOAN_KEY";

const setLoan = function (loan) {
	cacheProvider
		.instance()
		.set(CACHE_KEY, loan, CACHE_DURATION, function () {
			loan;
		});
	return cacheProvider
		.instance()
		.get(CACHE_KEY);
};

const getLoan = function () {
	return cacheProvider
		.instance()
		.get(CACHE_KEY);
};

module.exports = { setLoan, getLoan};