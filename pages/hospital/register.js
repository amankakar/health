import React, { Component } from "react";
import ReceptionsitFactory from "../../build/contracts/ReceptionsitFactory.json";
import Receptionist from "../../build/contracts/Receptionsit.json";
import { Form, Button, Input, Message } from "semantic-ui-react";
import { Link } from "../../routes";
import getWeb3 from "../../ethereum/getWeb3";
import web3 from "../../ethereum/web3";
import truffleContract from "truffle-contract";
import Layout from "../../components/Layout";

class register extends Component {
  state = {
    web3: null,
    accounts: null,
    hospitalName: "",
    receptionistName: "",
    instanceFactory1: "",
    receptionistInstance: "",
    recetionistAddress: "",
    accountForFirstTime: "",
    errorMessage: "",
    loading: false,
    accounts: ""
  };

  onSubmit = async event => {
    event.preventDefault();
    try {
      // const web3 = await getWeb3();
      // const accounts = await web3.eth.getAccounts();
      // this.setState({ web3 });
      this.setState({ loading: true, errorMessage: "" });

      console.log("Onsubmit");
      // const { web3 } = this.state;
      // console.log("WEB3", web3);
      const accounts = await web3.eth.getAccounts();
      console.log("We3:", web3);
      const Contract = truffleContract(ReceptionsitFactory);
      Contract.setProvider(web3.currentProvider);

      const instanceFactory = await Contract.deployed();
      const instanceFactory1 = instanceFactory.address;
      console.log("factory:", instanceFactory);
      this.setState({ instanceFactory });
      console.log("address:", instanceFactory1);
      this.setState({ instanceFactory1 });
      try {
        const manager = await instanceFactory.manager.call();
      } catch (error) {
        console.log(error);
      }
      console.log("MAnager:");
      //  var manager = await instanceFactory.manager.call();

      //  const receptionistInstance = await ContractReceptionist.at(address);
      alert(accounts[0] + " will be your account for admin");
      try {
        const rec = await instanceFactory.createReceptionist(
          this.state.hospitalName,
          this.state.receptionistName,
          {
            from: accounts[0]
          }
        );
        alert("Registered Successfully");
      } catch (error) {
        console.log("Error of try:", error);
        this.setState({ errorMessage: error.message });
      }
      // const recetionistAddress = await instanceFactory.accountToAddress.call(
      //   accounts[0]
      // );

      // const ContractReceptionist = truffleContract(Receptionist);
      // ContractReceptionist.setProvider(web3.currentProvider);
      // const instanceReceptionist = await ContractReceptionist.at(
      //   recetionistAddress
      // );
      // const summary = await instanceReceptionist.getSummary.call();
      // this.setState({
      //   hospitalName: summary[0],
      //   receptionistName: summary[1]
      // });
      //
      // console.log("Manager:", manager);
      // console.log("Factory address:", instanceFactory.address);
      // console.log("ReceptionistAddress:", recetionistAddress);
      // console.log("Summary:", summary);
      // console.log(web3.version);
      // console.log(accounts[0]);
      // this.setState({
      //   instanceReceptionist,
      //   recetionistAddress
      // });
    } catch (error) {
      console.log(error);
      this.setState({ errorMessage: error.message });
    }
    this.setState({ loading: false });
  };

  onHospitalHandle = event => {
    this.setState({
      hospitalName: event.target.value,
      loading: false,
      errorMessage: ""
    });
  };
  onReceptionistHandle = event => {
    this.setState({ receptionistName: event.target.value });
  };

  render() {
    return (
      <Layout>
        <div>
          <h1>Register new Receptionist</h1>
          <h3>Create new Receptionist</h3>
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
              <label>Hospital Name</label>
              <Input
                value={this.state.hospitalName}
                onChange={this.onHospitalHandle}
              />
            </Form.Field>
            <Form.Field>
              <label>Admin Name</label>
              <Input
                value={this.state.receptionistName}
                onChange={this.onReceptionistHandle}
              />
            </Form.Field>
            <Message error header="Oops..!" content={this.state.errorMessage} />

            <Button loading={this.state.loading} primary>
              {" "}
              Register Admin/Receptionsit{" "}
            </Button>
          </Form>
        </div>
      </Layout>
    );
  }
}
export default register;
