import React, { Component } from "react";
import ReceptionsitFactory from "../build/contracts/ReceptionsitFactory.json";
import Receptionist from "../build/contracts/Receptionsit.json";
import { Form, Button, Input, Message, Card } from "semantic-ui-react";
import { Link } from "../routes";
import web3 from "../ethereum/web3";
import truffleContract from "truffle-contract";
import Layout from "../components/Layout";
import instanceFactoryFile from "../ethereum/receptionFactory";
class index extends Component {
  state = {
    web3: null,
    accounts: null,
    hospitalName: "",
    receptionistName: "",
    instanceFactory1: "",
    receptionistInstance: "",
    recetionistAddress: "",
    instanceFactory: "",
    receptionist: "",
    receptionList: []
  };

  static async getInitialProps() {
    //const web3 = await getWeb3();
    console.log("web3", web3.version);
    const accounts = await web3.eth.getAccounts();

    //this.setState({ web3, accounts });
    const Contract = truffleContract(ReceptionsitFactory);
    Contract.setProvider(web3.currentProvider);

    const instanceFactory = await Contract.deployed();
    console.log("Address:", instanceFactory);
    const receptionCount = await instanceFactory.getReceptionList.call();
    console.log("List of :", receptionCount);
    const receptionist = await Promise.all(
      Array(parseInt(receptionCount))
        .fill()
        .map((element, index) => {
          return instanceFactory.receptionSummary.call(index);
        })
    );
    console.log("Receptionist Array", receptionist[0]);

    return { receptionist };
  }

  renderHospitals() {
    console.log("BRFORE:", this.props.receptionist);
    const items = this.props.receptionist.map((element, index) => {
      const address = element[3];
      return {
        header: "Hospital Name:  " + element[0],
        description: "Admin Name:  " + element[1],
        meta: "Account of Admin:  " + element[2],

        extra: (
          <Link route={`hospital/${address}`}>
            <a color="blue">Visit Hospital</a>
          </Link>
        ),
        fluid: true
      };
    });
    console.log("Lenght", this.props.receptionist);

    return (
      <Card.Group
        items={items}
        style={{
          color: "black",
          marginTop: 10,
          borderRadius: 4,
          margin: 10,
          fontFamily: "Times New Roman, Times, serif",
          fontSize: 20
        }}
      />
    );
  }

  onSubmit = async event => {
    event.preventDefault();

    const { web3, instanceFactory1, instanceFactory } = this.state;
    const accounts = await web3.eth.getAccounts();
    console.log(web3, accounts, instanceFactory1, instanceFactory);

    const rec = await instanceFactory.createReceptionist(
      this.state.hospitalName,
      this.state.receptionistName,
      {
        from: accounts[0]
      }
    );
  };

  onHospitalHandle = event => {
    this.setState({ hospitalName: event.target.value });
  };
  onReceptionistHandle = event => {
    this.setState({ receptionistName: event.target.value });
  };

  render() {
    return (
      <Layout>
        <div>
          <Link route="hospital/register">
            <a>
              <Button
                floated="right"
                primary
                content="Register New Admin/Receptionist"
                icon="add circle"
                labelPosition="left"
              />
            </a>
          </Link>
          <div style={{ marginLeft: 300 }}>
            <h2>List Of All Registered Hospitals</h2>
          </div>{" "}
        </div>
        <hr />
        <div>{this.renderHospitals()};</div>
        <Link route="/patient/">
          <a>this is link to patient/index.js page</a>
        </Link>

        <Link route="/doctor">
          <a>Doctor Page Link</a>
        </Link>
      </Layout>
    );
  }
}
export default index;
