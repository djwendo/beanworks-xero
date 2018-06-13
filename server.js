const express = require('express');

const app = express();
const port = process.env.PORT || 3001;

const XeroClient = require('xero-node').AccountingAPIClient;
const config = require('./config.json');

let xero = new XeroClient(config);

app.get('/accounts', async (req, res) => {
  const {Accounts} = await xero.accounts.get({where: 'Type=="EXPENSE"'});

  res.json( Accounts );
});

app.get('/contacts', async (req, res) => {
  const {Contacts} = await xero.contacts.get({where: 'IsSupplier==true'})
 
  res.json( Contacts );
});

app.listen(port, () => console.log(`Listening on port ${port}`));