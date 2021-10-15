Loan Simulator using GrapghQL:

1. Initiate loan: with arguments for initial amount, annual interest rate, and start date.

Request:
mutation($loanInput: createLoanInput){
  initiateLoan(loanInput: $loanInput)
}

{
  "loanInput": {
    "initialAmount": 60000,
    "interestRate": 2.5,
    "startDate": "2021-10-01"
  }
}

2. Add payment: with arguments for amount and date.
Request : 

mutation($paymentInput: addPaymentInput){
  addPayment(paymentInput: $paymentInput)
}


{
  "paymentInput": {
    "amount": 5000,
    "date": "2021-10-15"
  }
}



3. Get balance: takes a date as an argument and returns the total balance as of that date.
Request: 
query($effectiveDate: Date){
  getBalance(effectiveDate: $effectiveDate) 
}

{
  "effectiveDate": "2021-10-20"
}

