import React, { Component } from 'react';
import logo from './Beanworks Logo.png';
import './App.css';
import { CSVLink } from 'react-csv';

const vendorList = [];
const accountList = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: false,
        showVendors: '',
        showAccounts: '',
    };
    this.listVendors = this.listVendors.bind(this);
    this.listAccounts = this.listAccounts.bind(this);
    this.downloadContacts = this.downloadContacts.bind(this);
    // this.downloadFile = this.downloadFile.bind(this);
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
      <li key={vendor.ContactID}><strong>{vendor.Name}</strong> {vendor.Balances !== undefined ? `(Outstanding Balance: $${vendor.Balances.AccountsPayable.Outstanding})`:''}</li>
    )})
  }

  listAccounts(e) {
    e.preventDefault();
    this.setState({showAccounts: accountList.map((account) =>
      <li key={account.AccountID}><em>{account.Code}</em> - <strong>{account.Name}</strong></li>
    )})
  }
  downloadContacts(){
    this.callApi('contacts')
      .then(data => {
        this.downloadFile(JSON.stringify(data), 'contacts.json');
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
  // add to return: <button onClick={() => this.downloadFile('http://localhost:3001/contacts')}>Download JSON</button>


  render() { 
      return (
        // this.state.isLoading ? 
        // (<div className="App">
        //         <header className="App-header">
        //           <img src={logo} className="App-logo" alt="logo" />
        //         </header>
        //         <div className="App-body"><div> Loading... </div></div>
        //     </div>) : (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
            </header>
            <div className="App-body">
            <div className="Vendor-Section">
              <button className="View-Button" onClick={this.listVendors}>View List of Vendors</button>
              <CSVLink data={vendorList} filename={"vendor-details.csv"} target="_blank">
                <button className="Save-Button">Save Vendor Details</button>
              </CSVLink>
              <ul>{this.state.showVendors}</ul>
            </div>
            <div className="Account-Section">
              <button className="View-Button" onClick={this.listAccounts}>View List of Accounts</button>
              <button className="Save-Button" onClick={this.downloadContacts}>Save Account Details</button>
              <ul>{this.state.showAccounts}</ul>
            </div>
            </div>
          </div>
        )
      // )
    
  }
}

export default App;
