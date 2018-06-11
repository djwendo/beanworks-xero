import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  state = {
    invoices: [],
  };

  componentDidMount() {
    console.log('fetch invoices')
    // fetch('/invoices')
    //   .then(res => res.json())
    //   .then(invoices => this.setState({ invoices }))
    //   console.log('invoices', this.state.invoices);
    this.callApi()
      .then(res => this.setState({ invoices: [] }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const invoices = await fetch('/invoices');
    console.log('response', invoices);
    const body = await invoices.json();
    console.log('body', body)

    if (invoices.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {/* <h1>Invoices</h1>
        {this.state.invoices.map(invoice =>
          <div key={invoice.invoiceID}>{invoice.contact.name}</div>
        )} */}
      </div>
    );
  }
}

export default App;
