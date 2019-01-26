import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  //we are in browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
} else {
  //we are on the server OR user is not running metamask
  const provider = new Web3.providers.HttpProvider("http://localhost:9545");

  web3 = new Web3(provider);
}

export default web3;
