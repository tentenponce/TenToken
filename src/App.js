import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import TenToken from './build/contracts/TenToken.json';

class App extends Component {
  
  constructor() {
    super();
    
    this.state = {
      coinbase: "",
      balance: 0,
      accounts: [],
      accountBalances: [],
      tenToken: null,
      fromAddress: "",
      toAddress: "",
      amount: 0,
    }
  }
  
  componentWillMount() {
    let self = this;
    let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8555"));
    web3.eth.getCoinbase().then(v => {
      self.setState({coinbase: v});
      
      return web3.eth.getAccounts();
    }).then(accounts => {
      let tenContract = new web3.eth.Contract(TenToken.abi, tenTokenAddress);
      
      for (var i in accounts) {
        const accountToUse = accounts[i];
        tenContract.methods.balanceOf(accountToUse).call().then(r => {
          var accountBalances = this.state.accountBalances;
          
          accountBalances.push({
            address: accountToUse,
            balance: r
          });
          
          self.setState({accountBalances: accountBalances});
        });
      }
    });
  }
  
  transfer() {
    let self = this;
    let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8555"));
    let tenContract = new web3.eth.Contract(TenToken.abi, tenTokenAddress);
  
    console.log("Transfering: " + this.state.amount + " to: " + this.state.address);
    tenContract.methods.transfer(this.state.toAddress, this.state.amount).send({from: this.state.fromAddress}).then(r => {
      console.log("transfer result: " + r);
    }).catch(e => {
      console.log("error: " + e);
    });
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Account Balances: { this.state.accountBalances.map((accountBalance, key) => {
            return <p><b>Account Address: </b>{accountBalance.address} <br /><b>Balance: </b>{accountBalance.balance}</p>
          }) }
          <br />
        </p>
        From: <input onChange={ (e) => this.setState({fromAddress: e.target.value}) } />
        Transfer to: <input onChange={ (e) => this.setState({toAddress: e.target.value}) } />
        <br />
        Amount: <input onChange={ (e) => this.setState({amount: e.target.value}) } />
        <br />
        <button onClick={ this.transfer.bind(this) }>Transfer</button>
      </div>
    );
  }
}

const tenTokenAddress = "0x1bd9c012c6a79a7f641559e563aa5286bfd3db4e";

export default App;
