## Loan Simulator web service using GraphQL:
A service for simulating loan processing that supports the following operations:

###### To run on local
```bash
$npm install
$npm start
```
###### To run test cases
```bash
$npm test
```

run query graphql browser : http://localhost:9000/graphql

## 1. Initiate loan: with arguments for initial amount, annual interest rate, and start date. the state will be cleared when a new loan is initiated.

Request:
```javascript
  mutation($loanInput: createLoanInput){
  initiateLoan(loanInput: $loanInput)
}
```

```json 
{
  "loanInput": {
    "initialAmount": 60000,
    "interestRate": 2.5,
    "startDate": "2021-10-01"
  }
}
```

Response:
```json
{
  "data": {
    "initiateLoan": "loan created"
  }
}
```

![Alt text](/images/loan-initiate-resp.jpg?raw=true "initiate loan")

## 2. Add payment: with arguments for amount and date.
Request : 

```javascript 
mutation($paymentInput: addPaymentInput){
  addPayment(paymentInput: $paymentInput)
}
```
```json
{
  "paymentInput": {
    "amount": 5000,
    "date": "2021-10-15"
  }
}
```
Response:
```json
{
  "data": {
    "addPayment": "payment added"
  }
}
```
![Alt text](/images/add-payment-resp.jpg?raw=true "add payment")

## 3. Get balance: takes a date as an argument and returns the total balance as of that date.
Request: 
```javascript
query($effectiveDate: Date){
  getBalance(effectiveDate: $effectiveDate) 
}
```

```json
{
  "effectiveDate": "2021-10-20"
}
```

Response:
```json
{
  "data": {
    "getBalance": 55080.14
  }
}
```
![Alt text](/images/get-balance-resp.jpg?raw=true "get balance")
