const moment = require("moment");
const _ = require("lodash");

const getEffectiveBalance = (loan, effectiveDate) =>
{
	var startDate = moment(loan.startDate);
	var endDate = moment(effectiveDate);
	if (!endDate.isValid())
	{
		endDate = moment();
	}
	let principleAmount = loan.initialAmount;
	let totalInterestAmount = 0;

	for (var m = startDate; m.diff(endDate, "days") <= 0; m.add(1, "days")) {
		let matchingDayPayments = _.filter(loan.payments, payment=> moment(payment.date).format("YYYY-MM-DD") === m.format("YYYY-MM-DD"));

		if(loan.payments && matchingDayPayments)
		{
			let totalDayPayment = _.sumBy(matchingDayPayments, "amount");
			if(principleAmount - totalDayPayment <= 0){
				principleAmount = principleAmount - totalDayPayment + totalInterestAmount;
				totalInterestAmount = 0;

				if(principleAmount < 0)
				{
					principleAmount = 0;
				}
			}
			else{
				principleAmount = principleAmount - totalDayPayment;
			}
		}

		let dailyInterest = ((loan.interestRate/100)/365)*principleAmount;
		totalInterestAmount = totalInterestAmount + dailyInterest;
	}
	
	principleAmount = principleAmount + totalInterestAmount;	
	return parseFloat(principleAmount.toFixed(2));
};

module.exports = { getEffectiveBalance };