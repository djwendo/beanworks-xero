import React, { Component } from 'react';
// import logo from './logo.svg';
import logo from './Beanworks Logo.png';
import './App.css';

const vendorList = [];
const accountList = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        // vendors: vendorList,
        isLoading: false,
        showVendors: '',
        showAccounts: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.listVendors = this.listVendors.bind(this);
    this.listAccounts = this.listAccounts.bind(this);

  }

  componentDidMount() {
    console.log('fetching vendors')
    this.callApi("contacts")
      .then(function(data) { 
        data.forEach(contact => {
          if (contact.IsSupplier === true) {
            vendorList.push(contact)
          }
        })
      })
      .catch(err => console.log(err))
    // fetch('/contacts')
    //   .then(function(response) {
    //     return response.json();
    //   })
    //   .then(function(data) {
    //     data.forEach(contact => {
    //       contactList.push(contact)
    //     })
    //   });
    console.log('vendors!', vendorList)
    this.callApi("accounts")
    .then(function(data) { 
      data.forEach(account => {
        if (account.Type === "EXPENSE") {
          accountList.push(account)
        }
      })
    })
    .catch(err => console.log(err))
 
  console.log('accounts!', accountList)
  };
    
  callApi = async (link) => {
    const response = await fetch(`/${link}`);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  listVendors(e) {
    e.preventDefault();
    console.log('Listing Vendors');
    this.setState({showVendors: vendorList.map((vendor) =>
      <li key={vendor.ContactID}>{vendor.Name}</li>
    )})
  }

  listAccounts(e) {
    e.preventDefault();
    console.log('Listing Accounts');
    this.setState({showAccounts: accountList.map((account) =>
      <li key={account.AccountID}>{account.Code} - {account.Name}</li>
    )})
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
          <button className="Save-Button" onClick={this.handleClick}>Save List of Vendors to Disc</button>
          <ul>{this.state.showVendors}</ul>
        </div>
        <div className="Account-Section">
          <button className="View-Button" onClick={this.listAccounts}>View List of Accounts</button>
          <button className="Save-Button" onClick={this.handleClick}>Save List of Accounts to Disc</button>
          <ul>{this.state.showAccounts}</ul>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
