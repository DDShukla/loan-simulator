const loanService = require("./services/loan-service");
const interestService = require("./services/interest-service");
const Query = {
	getBalance: (root, {effectiveDate}) => {     
		let loan = loanService.getLoan();
		let effectiveBalance = interestService.getEffectiveBalance(loan, effectiveDate);
		return effectiveBalance;      
	}
};

const Mutation = {
	initiateLoan:(root, {loanInput}) => {
		let loan = {
			initialAmount : loanInput.initialAmount,
			interestRate: loanInput.interestRate,
			startDate: loanInput.startDate,
			payments: []
		};
		loanService.setLoan(loan);
		return "loan created";
	},
	addPayment:(root, {paymentInput}) => {
		let loan = loanService.getLoan();
		loan.payments.push({
			amount:paymentInput.amount,
			date: paymentInput.date
		});
		loanService.setLoan(loan);        
		return "payment added";
	}
};


module.exports = { Query, Mutation };
