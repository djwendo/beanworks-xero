const XeroClient = require('xero-node').AccountingAPIClient;
const config = require('./config.json');

const xero = new XeroClient(config);

xero.accounts.get({where: 'Type=="BANK"'})
  .then((accountData) => {
    process.stdout.write(JSON.stringify(accountData));
  })
