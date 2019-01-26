import web3 from "./getWeb3";
import ReceptionsitFactory from "../build/contracts/ReceptionsitFactory.json";
import truffleContract from "truffle-contract";
let contract, instanceFactory;
() => {
  contract = truffleContract(ReceptionsitFactory);
  contract.setProvider(web3.currentProvider);

  instanceFactory = contract.deployed();
};
export default instanceFactory;
