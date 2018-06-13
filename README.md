# Beanworks Tech Test

A simple landing page using React and Express to access API data from Xero, a third-party, online accounting Software.

Four buttons allow the user to:

1. View a list of Vendors, including any Outstanding Balance
1. Download Vendor details as JSON file
1. View a list of Accounts, showing Account Code and Account Name
1. Download Account details as JSON file

## User Experience

![vendors](https://user-images.githubusercontent.com/35348791/41373552-856896cc-6f05-11e8-971e-6e98ba3832de.gif)

![accounts](https://user-images.githubusercontent.com/35348791/41373628-b4a10672-6f05-11e8-850c-aed33392eb0c.gif)

## Setup

1. Fork and clone this repository
1. In terminal window, cd into the project root folder
    * Install dependencies using `npm install`
1. `cd react_app` and install dependencies using `npm install`
1. `cd ..` into root folder and create `config.json` based on `config.sample.json`
1. Sign up for Xero Developer Account
1. Create public/private key pair and save in `config.json` file
1. Run the app using `yarn react_app`
1. Visit `http://localhost:3000`

## Public/Private Key Pair

Visit https://developer.xero.com/documentation/api-guides/create-publicprivate-key for a tutorial on creating public/private key pair.

Ensure `privatekey.pem` is saved in the correct folder to be read by `config.json`.
Ensure `config.json` is saved in the correct folder to be accessed by `App.js`.

## Dependencies

* express ^4.16.2
* react ^16.4.0
* react-dom ^16.4.0
* react-scripts 1.1.4
* xero-node ^3.0.6