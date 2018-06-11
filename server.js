const express = require('express');

const app = express();
const port = process.env.PORT || 3001;

const XeroClient = require('xero-node').AccountingAPIClient;
const config = require('./config.json');

let xero = new XeroClient(config);

let invoiceList;

let accountList;

let vendorList;
 
(async () => {
  
  invoiceList = await xero.invoices.get();
  return invoiceList;

})();

(async () => {
 
  accountList = await xero.accounts.get();
  return accountList;

})();

(async () => {
 
  vendorList = await xero.contacts.get();
  return vendorList;

})();



app.get('/invoices', (req, res) => {
  res.send([ invoiceList ]);
});

app.get('/accounts', (req, res) => {
  res.send([ accountList ]);
});

app.get('/contacts', (req, res) => {
  res.send( vendorList.Contacts );
});

app.listen(port, () => console.log(`Listening on port ${port}`));