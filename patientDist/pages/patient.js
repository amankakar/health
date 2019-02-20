import React, { Component } from "react";
import Layout from "../components/patientLayout";
import ReceptionistFactory from "../../build/contracts/ReceptionsitFactory.json";
import Patient from "../../build/contracts/Patient.json";
import AppointmentRow from "../components/AppointmentRow";
import truffleContract from "truffle-contract";
import {
  Card,
  Button,
  Tab,
  Form,
  Input,
  Dropdown,
  Table,
  Grid,
  Segment,
  Message
} from "semantic-ui-react";
import Link from "../routes";
import web3 from "../../ethereum/web3";

class patient extends Component {
  static async getInitialProps() {
    const accounts = await web3.eth.getAccounts();
    const factory = truffleContract(ReceptionistFactory);
    factory.setProvider(web3.currentProvider);
    const instanceFactory = await factory.deployed();
    console.log(instanceFactory);
    const patient = truffleContract(Patient);
    patient.setProvider(web3.currentProvider);
    const patientAddress = await instanceFactory.accountToAddressPatient.call(
      accounts
    );
    console.log("accounts in metamask", accounts);

    //  console.log(patientAddress);
    if (patientAddress == 0x0000000000000000000000000000000000000000) {
      // alert("Sorry check your account or contact with authorized person");

      return { patientAddress: null };
    } else {
      const patientContract = await patient.at(patientAddress);
      console.log("patient address :", patientContract);

      const patientId = await patientContract.patientId.call();
      const summary = await patientContract.getSummary.call(patientId);
      console.log(summary);
      const appointmentList = await patientContract.getAppointmentList.call();
      console.log(appointmentList);

      const appointmentListData = await Promise.all(
        Array(parseInt(appointmentList))
          .fill()
          .map(async (element, index) => {
            const appointmentId = await patientContract.appointmentsList.call(
              index
            );
            return patientContract.appointments.call(appointmentId);
          })
      );
      console.log("Appointment Data:", appointmentListData);

      return {
        patient: patientContract,
        appointmentListData: appointmentListData,
        account: accounts[0],
        patientId: summary[0].toNumber(),
        patientName: summary[1],
        patientGender: summary[2],
        patientAge: summary[3].toNumber(),
        patientAccount: summary[4],
        patientAddress: patientAddress
      };
    }
  }

  state = {
    appointmentIdResult: "",
    appointmentIdSearch: "",
    patientIdResult: "",
    doctorIdresult: "",
    dateResult: "",
    chepComplaintResult: "",
    loading: false,
    errorMessage: "",
    doctorId: "",
    loadingDis: false,
    errorMessageDis: "",
    doctorIdDis: ""
  };

  checkApprovedDoctor = async () => {
    const { patient } = this.props;
    const doctorIdApproved = await patient.doctorIdArray.call();
    this.setState({ doctorIdForApprove: doctorIdApproved.toNumber() });
  };

  renderRow() {
    return this.props.appointmentListData.map((appointment, index) => {
      return (
        <AppointmentRow
          key={index}
          appointment={appointment}
          address={this.props.patientAddress}
        />
      );
    });
  }

  onSearchAppointment = async event => {
    event.preventDefault();
    const patient = this.props.patient;
    console.log(patient);

    const appointmentResult = await patient.appointments.call(
      parseInt(this.state.appointmentIdSearch)
    );
    console.log(appointmentResult);
    this.setState({
      appointmentIdResult: appointmentResult[0].toNumber(),
      patientIdResult: appointmentResult[1].toNumber(),
      doctorIdresult: appointmentResult[2].toNumber(),
      dateResult: appointmentResult[3],
      chepComplaintResult: appointmentResult[4]
    });
    // console.log(this.state.appointmentResult);
    this.onSearch();
  };

  onSearch = () => {
    if (this.state.appointmentIdResult) {
      return (
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Appointement Id</Table.HeaderCell>
              <Table.HeaderCell>Patient Id</Table.HeaderCell>
              <Table.HeaderCell>Doctor Id</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Chief Complaint</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{this.state.appointmentIdResult}</Table.Cell>
              <Table.Cell>{this.state.patientIdResult}</Table.Cell>
              <Table.Cell>{this.state.doctorIdresult}</Table.Cell>
              <Table.Cell>{this.state.dateResult}</Table.Cell>
              <Table.Cell>{this.state.chepComplaintResult}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );
    } else {
      return <h1>No Record Found</h1>;
    }
  };

  onAppointmentIdSearch = event => {
    this.setState({ appointmentIdSearch: event.target.value });
  };

  onDoctorId = event => {
    this.setState({ doctorId: event.target.value });
  };
  onDoctorIdDis = event => {
    this.setState({ doctorIdDis: event.target.value });
  };

  onSumbitApproval = async event => {
    event.preventDefault();
    const patient = this.props.patient;
    this.setState({ loading: true, errorMessage: "" });
    console.log(patient);

    const isPresent = await patient.doctorApproval.call(this.state.doctorId);
    console.log(isPresent);
    if (!isPresent) {
      try {
        await patient.addDoctorApproval(this.state.doctorId, {
          from: this.props.account
        });
        alert(this.state.doctorId + "is Approved to view Your Record");
        const doctorIdApproved = await patient.doctorIdArray.call();
        this.setState({ doctorIdForApprove: doctorIdApproved.toNumber() });
        console.log(this.state.doctorIdForApprove);
      } catch (error) {
        console.log("Error of try:", error);
        this.setState({ errorMessage: error.message });
      }
    } else {
      alert("Already Approved");
    }
    this.setState({ loading: false });
  };

  onSumbitDisapprove = async event => {
    event.preventDefault();
    const patient = this.props.patient;
    this.setState({ loadingDis: true, errorMessageDis: "" });
    console.log(patient);

    const isPresent = await patient.doctorApproval.call(this.state.doctorIdDis);
    console.log(isPresent);
    if (isPresent) {
      console.log(this.state.doctorIdDis);
      try {
        await patient.blockDoctor(this.state.doctorIdDis, {
          from: this.props.account,
          gas: "100000"
        });
        alert(this.state.doctorIdDis + "is disApproved to view Your Record");
        const doctorIdApproved = await patient.doctorIdArray.call();
        this.setState({ doctorIdForApprove: doctorIdApproved.toNumber() });
      } catch (error) {
        console.log("Error of try:", error);
        this.setState({ errorMessageDis: error.message });
      }
    } else {
      alert("Already DisApproved");
    }
    this.setState({ loadingDis: false });
  };
  renderTabs() {
    const { Header, Row, HeaderCell, Body } = Table;

    const panes = [
      {
        menuItem: "View Record",
        render: () => (
          <Tab.Pane attached={false}>
            <h1>Patient Record of Health-care</h1>
            <Table>
              <Header>
                <Row>
                  <HeaderCell>Appointment ID</HeaderCell>
                  <HeaderCell>Patient ID</HeaderCell>
                  <HeaderCell>Doctor ID</HeaderCell>
                  <HeaderCell>Date</HeaderCell>
                  <HeaderCell>Chief Complaint</HeaderCell>
                  <HeaderCell> Hash</HeaderCell>
                </Row>
              </Header>

              <Body>{this.renderRow()}</Body>
            </Table>
          </Tab.Pane>
        )
      },
      {
        menuItem: "Search Appointment",
        render: () => (
          <Tab.Pane attached={false}>
            <h1>Search Appointment</h1>
            <Form onSubmit={this.onSearchAppointment}>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Appointment Id</label>
                  <Input
                    value={this.state.appointmentIdSearch}
                    onChange={this.onAppointmentIdSearch}
                  />
                </Form.Field>

                <Button primary> Search Appointment </Button>
              </Form.Group>
            </Form>
            {this.onSearch()}
          </Tab.Pane>
        )
      },
      {
        menuItem: "Approve/DisApprove Doctor",
        render: () => (
          <Tab.Pane attached={false}>
            <Grid columns={2} divided>
              <Grid.Row stretched>
                <Grid.Column>
                  <Segment>
                    <h1>Approve Doctor</h1>
                    <Form
                      onSubmit={this.onSumbitApproval}
                      error={!!this.state.errorMessage}
                    >
                      <Form.Field>
                        <label>Doctor Id</label>
                        <Input
                          value={this.state.doctorId}
                          onChange={this.onDoctorId}
                        />
                      </Form.Field>
                      <Message
                        error
                        header="Oops..!"
                        content={this.state.errorMessage}
                      />

                      <Button loading={this.state.loading} primary>
                        {" "}
                        Approve Doctor{" "}
                      </Button>
                    </Form>
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment>
                    <h1>DisApprove Doctor</h1>
                    <Form
                      onSubmit={this.onSumbitDisapprove}
                      error={!!this.state.errorMessageDis}
                    >
                      <Form.Field>
                        <label>Doctor Id</label>
                        <Input
                          value={this.state.doctorIdDis}
                          onChange={this.onDoctorIdDis}
                        />
                      </Form.Field>
                      <Message
                        error
                        header="Oops..!"
                        content={this.state.errorMessageDis}
                      />

                      <Button loading={this.state.loadingDis} primary>
                        {" "}
                        disApprove Doctor{" "}
                      </Button>
                    </Form>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>{" "}
            <br />
            <Button onClick={this.checkApprovedDoctor}>
              {" "}
              check approved doctor Number
            </Button>
            <p style={{ color: "red" }}>
              Number of Doctor Approved: {this.state.doctorIdForApprove}
            </p>
          </Tab.Pane>
        )
      }
    ];
    return <Tab menu={{ attached: false }} panes={panes} />;
  }
  render() {
    if (this.props.patientAddress === null) {
      return (
        <Layout>
          <div style={{ color: "red" }}>
            <h1>
              You are not Registered as Patient or you have selected wrong
              account in metamask
              {this.props.account}
            </h1>
          </div>
        </Layout>
      );
    } else {
      return (
        <Layout>
          <div>
            <div
              style={{
                backgroundColor: "#4267b2",
                color: "white",
                marginTop: 10,
                borderRadius: 4,
                padding: 10,
                paddingLeft: 50,
                margin: 10,
                fontFamily: "Times New Roman, Times, serif",
                fontSize: 20
              }}
            >
              <div>Patient Name: {this.props.patientName}</div>
              <div>Patient Id:{this.props.patientId}</div>
              <div>Patient Gender:{this.props.patientGender}</div>
              <div>Patient Age:{this.props.patientAge}</div>
              <div>Patient Account: {this.props.patientAccount}</div>
            </div>
          </div>
          <div>{this.renderTabs()}</div>
        </Layout>
      );
    }
  }
}
export default patient;
