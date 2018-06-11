import React, { Component } from 'react';
// import logo from './logo.svg';
import logo from './Beanworks Logo.png';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        contacts: [],
        isLoading: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    console.log('fetching contacts')
    fetch('/contacts')
      .then(response => response.json())
      .then(data => this.setState({ contacts: data, isLoading: false }));
    console.log('contacts', this.state.contacts);

  };
  //   this.callApi()
  //     .then(res => this.setState({ invoices: [] }))
  //     .catch(err => console.log(err));
  // }

  // callApi = async () => {
  //   const invoices = await fetch('/invoices');
  //   console.log('response', invoices);
  //   const body = await invoices.json();
  //   console.log('body', body)

  //   if (invoices.status !== 200) throw Error(body.message);

  //   return body;
  // };

  handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="App-body">
        <div className="Vendor-Section">
          <button className="View-Button" onClick={this.handleClick}>View List of Vendors</button>
          <button className="Save-Button" onClick={this.handleClick}>Save List of Vendors to Disc</button>
        </div>
        <div className="Account-Section">
          <button className="View-Button" onClick={this.handleClick}>View List of Accounts</button>
          <button className="Save-Button" onClick={this.handleClick}>Save List of Accounts to Disc</button>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
