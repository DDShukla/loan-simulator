const moment = require("moment");
const _ = require("lodash");

const getEffectiveBalance = (loan, effectiveDate) =>
{
	var startDate = moment(loan.startDate);
	var endDate = moment(effectiveDate);
	let principleAmount = loan.initialAmount;
	let totalInterestAmount = 0;

	for (var m = startDate; m.diff(endDate, "days") <= 0; m.add(1, "days")) {

		let matchingDayPayment = _.find(loan.payments, payment=> moment(payment.date).format("YYYY-MM-DD") === m.format("YYYY-MM-DD"));
     
		if(loan.payments && matchingDayPayment)
		{
			principleAmount = principleAmount - matchingDayPayment.amount;
		}

		let dailyInterest = ((loan.interestRate/100)/365)*principleAmount;
		totalInterestAmount = totalInterestAmount + dailyInterest;          
	}
	
	principleAmount = principleAmount + totalInterestAmount;
	return parseFloat(principleAmount.toFixed(2));
};

module.exports = { getEffectiveBalance };