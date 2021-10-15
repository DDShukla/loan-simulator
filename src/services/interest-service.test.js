/*global describe, test, expect*/

const interestService = require("./interest-service");

describe("effective balance calculation without payments", () => {

	test("effective balance for 1 day from start date", () => {
		var loan = {
			initialAmount : 25000,
			interestRate: 6,
			startDate: "2021-01-01",
			payments: []
		};
		var effectiveDate = "2021-01-01";
		expect(interestService.getEffectiveBalance(loan, effectiveDate)).toBe(25004.11);
	});


	test("effective balance for 2 day from start date", () => {
		var loan = {
			initialAmount : 25000,
			interestRate: 6,
			startDate: "2021-01-01",
			payments: []
		};
		var effectiveDate = "2021-01-02";
		expect(interestService.getEffectiveBalance(loan, effectiveDate)).toBe(25008.22);
	});


	test("effective balance for 10 day from start date", () => {
		var loan = {
			initialAmount : 25000,
			interestRate: 6,
			startDate: "2021-01-01",
			payments: []
		};
		var effectiveDate = "2021-01-10";
		expect(interestService.getEffectiveBalance(loan, effectiveDate)).toBe(25041.10);
	});

});


describe("effective balance calculation with payments", () => {

	test("effective balance after next day full payment", () => {
		var loan = {
			initialAmount : 25000,
			interestRate: 6,
			startDate: "2021-01-01",
			payments: [
				{ amount:25000, date:"2021-01-02"}
			]
		};
		var effectiveDate = "2021-01-11";
		expect(interestService.getEffectiveBalance(loan, effectiveDate)).toBe(4.12);
	});
	test("effective balance after payment in parts", () => {
		var loan = {
			initialAmount : 25000,
			interestRate: 6,
			startDate: "2021-01-01",
			payments: [
				{ amount:15000, date:"2021-01-02"},
				{ amount:5000, date:"2021-01-06"},
				{ amount:5000, date:"2021-01-08"}
			]
		};
		var effectiveDate = "2021-01-09";
		expect(interestService.getEffectiveBalance(loan, effectiveDate)).toBe(12.33);
	});
});

describe("when total balance is paid", () => {

	test("effective balance after next day full payment", () => {
		var loan = {
			initialAmount : 1000,
			interestRate: 36.5,
			startDate: "2021-01-01",
			payments: [
				{ amount:1180, date:"2021-07-01"}
			]
		};
		var effectiveDate = "2021-12-31";
		expect(interestService.getEffectiveBalance(loan, effectiveDate)).toBe(1.18);
	});
});
