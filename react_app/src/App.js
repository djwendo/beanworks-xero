import React, { Component } from 'react';
import logo from './Beanworks Logo.png';
import './App.css';

const vendorList = [];
const accountList = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showVendors: '',
        showAccounts: '',
    };
    this.listVendors = this.listVendors.bind(this);
    this.listAccounts = this.listAccounts.bind(this);
    this.downloadVendors = this.downloadVendors.bind(this);
    this.downloadAccounts = this.downloadAccounts.bind(this);
  }

  componentDidMount() {
   
    this.callApi("contacts")
      .then(function(data) { 
        data.forEach(vendor => {
          vendorList.push(vendor)
        })
      })
      .catch(err => console.log(err));

    this.callApi("accounts")
      .then(function(data) { 
        data.forEach(account => {
          accountList.push(account)
        })
      })
      .catch(err => console.log(err));
  }
    
  async callApi(link) {
    const response = await fetch(`/${link}`);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  listVendors(e) {
    e.preventDefault();
    this.setState({showVendors: vendorList.map((vendor) => 
      <li key={vendor.ContactID}><strong>{vendor.Name}</strong> <em>{vendor.Balances !== undefined ? `(Outstanding Balance: $${vendor.Balances.AccountsPayable.Outstanding})`:''}</em></li>
    )})
  }

  listAccounts(e) {
    e.preventDefault();
    this.setState({showAccounts: accountList.map((account) =>
      <li key={account.AccountID}><em>{account.Code}</em> - <strong>{account.Name}</strong></li>
    )})
  }

  downloadVendors(){
    this.callApi('contacts')
      .then(data => {
        this.downloadFile(JSON.stringify(data), 'vendor-details.json');
      })
  }

  downloadAccounts(){
    this.callApi('accounts')
      .then(data => {
        this.downloadFile(JSON.stringify(data), 'account-details.json');
      })
  }

  downloadFile(dataString, filename) {
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,' + dataString;
    link.download = filename;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    link.parentElement.removeChild(link);
  }

  render() { 
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="App-body">
          <div className="Vendor-Section">
            <button className="View-Button" onClick={this.listVendors}>View List of Vendors</button>
            <button className="Save-Button" onClick={this.downloadVendors}>Save Vendor Details</button>
            <ul>{this.state.showVendors}</ul>
          </div>
          <div className="Account-Section">
            <button className="View-Button" onClick={this.listAccounts}>View List of Accounts</button>
            <button className="Save-Button" onClick={this.downloadAccounts}>Save Account Details</button>
            <ul>{this.state.showAccounts}</ul>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
