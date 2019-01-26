import React, { Component } from "react";
import Layout from "../../components/doctorLayout";
import web3 from "../../ethereum/web3";
import Factory from "../../build/contracts/ReceptionsitFactory.json";
import Doctor from "../../build/contracts/Doctor.json";
import Patient from "../../build/contracts/Patient.json";
import AppointmentRow from "../../components/AppointmentRow";
import { Link } from "../../routes";
import truffleContract from "truffle-contract";
import {
  Card,
  Button,
  Tab,
  Form,
  Input,
  Dropdown,
  Table,
  Message
} from "semantic-ui-react";
import ipfs from "../ipfs";
class doctor extends Component {
  state = {
    appointmentIdResult: "",
    appointmentIdSearch: "",
    patientIdResult: "",
    doctorIdresult: "",
    dateResult: "",
    chepComplaintResult: "",
    appointmentIdForFile: "",
    isCheckTrue: false,
    buffer: "",
    errorMessage: "",
    loading: false,
    patientId: "",
    instancePatient: "",
    appointmentListData: "",
    doctorApproved: false
  };

  static async getInitialProps() {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    const factory = truffleContract(Factory);
    factory.setProvider(web3.currentProvider);
    const instanceFactory = await factory.deployed();
    const doctor = truffleContract(Doctor);
    const patient = truffleContract(Patient);
    patient.setProvider(web3.currentProvider);
    doctor.setProvider(web3.currentProvider);

    const doctorAddress = await instanceFactory.accountToAddressDoctor.call(
      accounts[0]
    );
    if (doctorAddress == 0x0000000000000000000000000000000000000000) {
      return { doctorAddress: null };
    } else {
      const instanceDoctor = await doctor.at(doctorAddress);
      const doctorId = await instanceDoctor.doctorId.call();
      const summary = await instanceDoctor.getSummary.call(doctorId);

      return {
        patient: patient,
        doctorAddress: doctorAddress,
        doctor: instanceDoctor,
        instanceFactory: instanceFactory,
        doctorId: summary[0].toNumber(),
        doctorName: summary[1],
        doctorGender: summary[2],
        qualification: summary[3],
        account: summary[4],
        accounts: accounts
      };
    }
  }

  onAppointmentIdForFile = e => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      this.setState({ appointmentIdForFile: e.target.value });
    }
    console.log(this.state.appointmentIdForFile);
  };

  onPatientId = e => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      this.setState({ patientId: e.target.value });
    }
  };
  onAppointmentIdSearch = event => {
    this.setState({ appointmentIdSearch: event.target.value });
  };

  onSearchAppointment = async event => {
    event.preventDefault();
    const doctor = this.props.doctor;
    console.log(doctor);

    const appointmentResult = await doctor.appointments.call(
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

  onAddPrescriptionSearch = async () => {
    const { appointmentIdForFile } = this.state;
    const doctor = this.props.doctor;
    const appointment = await doctor.appointments.call(appointmentIdForFile);
    const isCheckTrue = appointment[6];
    if (appointment[0].toNumber() == 0 || isNaN(appointment[0].toNumber())) {
      alert("please provide right Appointment Id");
    } else {
      this.setState({
        appointmentIdForFile: appointment[0].toNumber(),
        isCheckTrue: isCheckTrue
      });
      console.log(this.state.isCheckTrue, this.state.appointmentIdForFile);
      this.renderFile();
    }
  };

  onSubmit = async event => {
    try {
      this.setState({ loading: true, errorMessage: "" });

      console.log(this.state.appointmentIdForFile);
      const doctor = this.props.doctor;
      const appointment = await doctor.appointments.call(
        this.state.appointmentIdForFile
      );
      const isCheckTrue = appointment[6];
      console.log(isCheckTrue);
      if (isCheckTrue || this.state.appointmentIdForFile == 0) {
        return alert("Sorry provide valid appointment Id");
      } else {
        ipfs.files.add(this.state.buffer, async (error, result) => {
          if (error) {
            console.error(error);
            this.setState({ errorMessage: error.message });
            return;
          }
          this.setState({ loading: false });

          // const ethAddress = instance.address;
          // this.setState({ ethAddress });

          const prescription = await doctor.addPrescription(
            this.state.appointmentIdForFile,
            result[0].hash,
            { from: this.props.accounts[0] }
          );
        });
        const appointment = await doctor.appointments.call(
          this.state.appointmentIdForFile
        );
        console.log(appointment);
      }
    } catch (err) {
      console.log(error);
      this.setState({ errorMessage: err.message });
    }
  };

  onSumbitPatientId = async event => {
    event.preventDefault();
    const instanceFactory = this.props.instanceFactory;
    const patient = this.props.patient;
    const patientAddress = await instanceFactory.patientIdToAddress.call(
      parseInt(this.state.patientId)
    );
    if (patientAddress == 0x0000000000000000000000000000000000000000) {
      alert("sorry wrong patient id");
    }
    const instancePatient = await patient.at(patientAddress);
    const checkDoctorId = await instancePatient.doctorApproval.call(
      this.props.doctorId
    );

    if (checkDoctorId) {
      this.setState({ doctorApproved: true });
    } else {
      alert("Sorry you are not allowed to view patient record");
    }
  };

  captureFile = event => {
    event.preventDefault();
    try {
      const file = event.target.files[0];
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
        this.setState({ buffer: Buffer(reader.result) });
        console.log("buffer:", this.state.buffer);
      };
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
  };

  renderFile = () => {
    console.log("render file:", this.state.isCheckTrue);
    // console.log("address", this.props.);
    if (!this.state.isCheckTrue) {
      return (
        <div>
          <h1>Please Add File</h1>
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Group widths="equal">
              <Input
                type="file"
                onChange={this.captureFile}
                style={{
                  width: 800,
                  height: 40,
                  opacity: 100
                }}
              />
              <Button
                loading={this.state.loading}
                primary
                icon="upload"
                label={{
                  basic: true,
                  content: "upload file"
                }}
                labelPosition="right"
              />
            </Form.Group>
            <Message error header="Oops..!" content={this.state.errorMessage} />
          </Form>
        </div>
      );
    } else {
      return (
        <div>
          <h1>already Completed</h1>
        </div>
      );
    }
  };

  renderTabs() {
    const { Header, Row, HeaderCell, Body } = Table;
    const { patientId } = this.state;
    const panes = [
      {
        menuItem: "Add File of Visit",
        render: () => (
          <Tab.Pane attached={false}>
            <h1>Add File of Appointment</h1>
            <h1>Search Appointment</h1>
            <Form onSubmit={this.onAddPrescriptionSearch}>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Appointment Id</label>
                  <Input
                    value={this.state.appointmentIdForFile}
                    onChange={this.onAppointmentIdForFile}
                  />
                </Form.Field>

                <Button primary> Search Appointment </Button>
              </Form.Group>
            </Form>

            {this.renderFile(
              this.state.appointmentIdForFile,
              this.state.isCheckTrue
            )}
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
        menuItem: "View Patient Record",
        render: () => (
          <Tab.Pane attached={false}>
            <h1>View Patient Record</h1>
            <Form onSubmit={this.onSumbitPatientId}>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Patient id</label>
                  <Input
                    value={this.state.patientId}
                    onChange={this.onPatientId}
                  />
                </Form.Field>
                <Button primary> View record </Button>
              </Form.Group>
            </Form>{" "}
            <b>
              {this.state.doctorApproved ? (
                <Link route={`../doctor/patientRecord/${patientId}`}>
                  <a>View Patient Record</a>
                </Link>
              ) : (
                "Sorry you are not allowed"
              )}
            </b>
          </Tab.Pane>
        )
      }
    ];
    return <Tab menu={{ attached: false }} panes={panes} />;
  }

  render() {
    if (this.props.doctorAddress !== null) {
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
              <div>Doctor Id: {this.props.doctorId}</div>
              <div> Doctor Name : {this.props.doctorName}</div>
              <div>Gender: {this.props.doctorGender}</div>
              <div>Qualification: {this.props.qualification}</div>
              <div> Account: {this.props.account}</div>
            </div>
            {this.renderTabs()}
          </div>
        </Layout>
      );
    } else {
      return (
        <Layout>
          <div style={{ color: "red" }}>
            <h1>
              You are not Registered as Doctor or you have selected wrong
              account in metamask
            </h1>
          </div>
        </Layout>
      );
    }
  }
}
export default doctor;
