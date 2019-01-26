import React, { Component } from "react";
import ReactDOM from "react-dom";
import ToggleDisplay from "react-toggle-display";
import ReceptionsitFactory from "../../build/contracts/ReceptionsitFactory.json";
import Receptionist from "../../build/contracts/Receptionsit.json";
//import PatientFactory from "../../build/contracts/PatientFactory.json";
import Patient from "../../build/contracts/Patient.json";
//import DoctorFactory from "../../build/contracts/DoctorFactory.json";
import Doctor from "../../build/contracts/Doctor.json";
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
import DatetimePicker from "react-semantic-datetime";
import moment from "moment"; //for date picker
import { BigNumber } from "bignumber.js";

import { Link } from "../../routes";
import getWeb3 from "../../ethereum/getWeb3";
import web3 from "../../ethereum/web3";
import truffleContract from "truffle-contract";
import Layout from "../../components/Layout";
// import Dropdown from "react-dropdown";
// import "../style.css";
class hospitalDetails extends Component {
  //intialize state of variable use
  state = {
    show: false,
    patientName: "",
    patientAge: "",
    patientGender: "",
    patientId: "",
    doctorName: "",
    doctorGender: "",
    doctorQualification: "",
    doctorId: "",
    appointmentId: "",
    patientAccount: "",
    doctorAccount: "",
    textArea: "",
    currentPatientValue: "",
    currentDoctorValue: "",
    notAdmin: "",
    date: moment(),
    date1: "",
    dateTimeOpen: false,
    patientIdArray: null,
    doctorIdArray: null,
    appointmentIdResult: "",
    appointmentIdSearch: "",
    patientIdResult: "",
    doctorIdresult: "",
    dateResult: "",
    chepComplaintResult: "",
    errorMessagePatient: "",
    errorMessageDoctor: "",
    errorMessageAppointment: "",
    loading: false
  };
  //get Address of  hospital/ Receptionist contract provided in intial props and set show contract information
  static async getInitialProps(props) {
    const address = props.query.address;
    console.log("ADdress:", address);
    const accounts = await web3.eth.getAccounts();
    const ContractReceptionist = truffleContract(Receptionist);
    ContractReceptionist.setProvider(web3.currentProvider);
    const instanceReceptionist = await ContractReceptionist.at(address);
    const hospitalSummary = await instanceReceptionist.getSummary.call();
    console.log(accounts[0], "and acctual is ===:", hospitalSummary[2]);
    const optionsArray = ["one", "two", "three"];
    console.log("S", hospitalSummary);

    return {
      address: props.query.address,
      hospitalName: hospitalSummary[0],
      adminName: hospitalSummary[1],
      manager: hospitalSummary[2]
    };
  }
  //unlock admin view
  onUnlockView = async event => {
    event.preventDefault();
    var admin;
    console.log("Clicked");
    //const web3 = await getWeb3();
    console.log("web3:", web3);
    const accounts = await web3.eth.getAccounts();
    console.log("account at index:", this.props.manager);
    console.log("account in metamask", accounts);
    const Factory = truffleContract(ReceptionsitFactory);
    //  console.log(Factory);
    Factory.setProvider(web3.currentProvider);
    console.log(Factory);

    const factoryInstance = await Factory.deployed();

    const patientList = await factoryInstance.getPatientList.call();
    this.setState({ patientIdArray: patientList });
    this.preparePatientDropDown();

    const doctorList = await factoryInstance.getDoctorList.call();
    this.setState({ doctorIdArray: doctorList });
    this.prepareDoctorDropdown();

    if (this.props.manager === accounts[0]) {
      this.setState({ show: !this.state.show });

      console.log("ISADMIn:", this.state.show);
    } else {
      this.setState({ show: false });
      this.setState({
        notAdmin:
          "you are not admin or you have selected Wrong account in Metamask please check"
      });
      console.log("ISADMIn:", this.state.show);
    }
  };

  //Add Patient
  addPatient = async () => {
    //const { patientFactoryInstance } = this.props;
    const Factory = truffleContract(ReceptionsitFactory);
    //  console.log(Factory);
    Factory.setProvider(web3.currentProvider);
    console.log(Factory);
    //PatinentContract;
    const Contract = truffleContract(Patient);
    //console.log(Contract);
    Contract.setProvider(web3.currentProvider);
    //  console.log(Contract);
    const factoryInstance = await Factory.deployed();
    console.log("RESULT:", factoryInstance.address);
    if (
      this.state.patientId == "" ||
      this.state.patientId == 1 ||
      this.state.patientAccount == "" ||
      this.state.patientAccount == 0
    ) {
      alert("Please provide patient id and account");
    } else {
      try {
        const accounts = await web3.eth.getAccounts();
        this.setState({ loading: true, errorMessagePatient: "" });

        const result = await factoryInstance.addPatient(
          // 1,
          // "Aman",
          // "Male",
          // 24,
          // accounts[0],
          this.state.patientId,
          this.state.patientName,
          this.state.patientGender,
          this.state.patientAge,
          this.state.patientAccount,
          { from: accounts[0] }
        );
        alert("Patient Added Successfully");
        console.log("RESULT:", result);
      } catch (error) {
        console.error(error);
        this.setState({ errorMessagePatient: error.message });
      }
      this.setState({ loading: false });

      const patientinstanceAddress = await factoryInstance.patientIdToAddress.call(
        this.state.patientId
      );
      const patientInstance = await Contract.at(patientinstanceAddress);

      const summary = await patientInstance.getSummary.call(
        this.state.patientId
      );
      console.log("summary:", summary);
      console.log("address of patient:", patientinstanceAddress);
      this.preparePatientDropDown();
    }
  };
  //prepare dropdown for patient
  async preparePatientDropDown() {
    const Factory = truffleContract(ReceptionsitFactory);
    //  console.log(Factory);
    Factory.setProvider(web3.currentProvider);

    const patientFactoryInstance = await Factory.deployed();

    const patientList = await patientFactoryInstance.getPatientList.call();
    const patient = await Promise.all(
      Array(parseInt(patientList))
        .fill()
        .map((element, index) => {
          return patientFactoryInstance.patientId.call(index);
        })
    );
    console.log("Patient list:", patient);
    this.setState({ patientIdArray: patient });

    console.log("patientList:", this.state.patientIdArray);
  }

  //prepare dropdown for doctor id
  async prepareDoctorDropdown() {
    const Factory = truffleContract(ReceptionsitFactory);
    //  console.log(Factory);
    Factory.setProvider(web3.currentProvider);

    const doctorFactoryInstance = await Factory.deployed();

    const doctorList = await doctorFactoryInstance.getDoctorList.call();
    const doctor = await Promise.all(
      Array(parseInt(doctorList))
        .fill()
        .map((element, index) => {
          return doctorFactoryInstance.doctorId.call(index);
        })
    );
    console.log("Doctor list:", doctor);
    this.setState({ doctorIdArray: doctor });

    console.log("patientList:", this.state.doctorIdArray);
  }
  //Add Doctor
  addDoctor = async event => {
    const Factory = truffleContract(ReceptionsitFactory);
    //  console.log(Factory);
    Factory.setProvider(web3.currentProvider);

    const factoryInstance = await Factory.deployed();
    if (
      this.state.doctorId == "" ||
      this.state.doctorId == 2 ||
      this.state.doctorAccount == "" ||
      this.state.doctorAccount == 0
    ) {
      alert("Please provide doctor id and account");
    } else {
      try {
        const accounts = await web3.eth.getAccounts();
        this.setState({ loading: true, errorMessageDoctor: "" });

        const result = await factoryInstance.addDoctor(
          // 1,
          // "Aman",
          // "Male",
          // 24,
          // accounts[0],
          this.state.doctorId,
          this.state.doctorName,
          this.state.doctorGender,
          this.state.doctorQualification,
          this.state.doctorAccount,
          { from: accounts[0] }
        );
        alert("Doctor Added Successfully");
        console.log("RESULT:", result);
      } catch (error) {
        console.error(error);
        this.setState({ errorMessageDoctor: error.message });
      }
      this.setState({ loading: false });

      const doctorInstanceAddress = await factoryInstance.doctorIdToAddress.call(
        this.state.doctorId
      );
      //const doctorInstance = await Contract.at(doctorInstanceAddress);
      //
      // const summary = await doctorInstance.getSummary.call(this.state.doctorId);
      // console.log("summary:", summary);
      const doctorList = await factoryInstance.getDoctorList.call();
      console.log("doctorlist:", doctorList.length);
      //  const patientFactoryInstance = await Factory.deployed();
      console.log("address of Doctor:", doctorInstanceAddress);
      this.prepareDoctorDropdown();
    }
  };

  //On appointment onSubmit
  onAppointmentSubmit = async event => {
    console.log(this.state.currentPatientValue);
    console.log(this.state.currentDoctorValue);
    console.log(this.state.date1);
    console.log(this.state.date);
    console.log(moment(this.state.myDate).format("LLL"));
    console.log(this.state.appointmentId);
    console.log(this.state.textArea);
    const accounts = await web3.eth.getAccounts();
    const ContractFactory = truffleContract(ReceptionsitFactory);
    ContractFactory.setProvider(web3.currentProvider);

    const instanceFactory = await ContractFactory.deployed();

    console.log(this.props.address);
    const date = moment(this.state.muDate).format("LLL");
    if (this.state.appointmentId == "") {
      alert("please provide appointementId");
    } else {
      try {
        this.setState({ loading: true, errorMessageAppointment: "" });
        await instanceFactory.createAppointment(
          this.state.appointmentId,
          this.state.currentPatientValue,
          this.state.currentDoctorValue,
          moment(this.state.myDate).format("LLL"),
          this.state.textArea,
          // 123,
          // 456,
          // 567,
          // "12/14/2018",
          // "fhklolp",
          { from: accounts[0] }
        );
        alert(
          "Appointment Created  and appointment Id :" +
            this.state.appointmentId +
            "Date of appintment is :" +
            date
        );
      } catch (err) {
        console.error(err);
        this.setState({ errorMessageAppointment: err.message });
      }
      this.setState({ loading: false });
    }
  };

  onSearchAppointment = async event => {
    event.preventDefault();
    const ContractFactory = truffleContract(ReceptionsitFactory);
    ContractFactory.setProvider(web3.currentProvider);

    const instanceFactory = await ContractFactory.deployed();
    const appointmentResult = await instanceFactory.appointements.call(
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
    console.log(this.state.appointmentResult);
    return this.onSearch();
  };

  //search Result render
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
  //State methods to handle state of inputs
  //Patient add form handler methods
  onPatientIdHandle = event => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      this.setState({ patientId: event.target.value });
    }
  };
  onPatientHandle = event => {
    const re = /^[A-Za-z ]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      this.setState({ patientName: event.target.value });
    }
  };

  onGenderPatientHandle = (event, { value }) => {
    this.setState({ patientGender: value });
    console.log(this.state.patientGender);
  };

  onAgeHandle = event => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      this.setState({ patientAge: event.target.value });
    }
  };

  //Doctor form handler mathodes
  onDoctorIdHandle = event => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      this.setState({ doctorId: event.target.value });
    }
  };
  onDoctorHandle = event => {
    const re = /^[A-Za-z ]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      this.setState({ doctorName: event.target.value });
    }
  };

  onQualificationHandle = event => {
    const re = /^[A-Za-z ]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      this.setState({ doctorQualification: event.target.value });
    }
  };

  onGenderDoctorHandle = (event, { value }) => {
    this.setState({ doctorGender: value });
  };

  onAppointmentId = event => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      this.setState({ appointmentId: event.target.value });
    }
    //console.log(this.state.app);
  };
  onPatientAccountHandle = event => {
    this.setState({ patientAccount: event.target.value });
  };
  onDoctorAccountHandle = event => {
    this.setState({ doctorAccount: event.target.value });
  };
  onTextArea = event => {
    this.setState({ textArea: event.target.value });
    console.log(this.state.textArea);
  };

  handlePatientChange = (e, { value }) => {
    //  console.log(value);
    this.setState({ currentPatientValue: value });
    console.log(this.state.currentPatientValue);
  };

  handleDoctorChange = (e, { value }) => {
    //  console.log(value);
    this.setState({ currentDoctorValue: value });
    console.log(this.state.currentDoctorValue);
  };

  onAppointmentIdSearch = event => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      this.setState({ appointmentIdSearch: event.target.value });
    }
  };
  //render methods to render jsx Components
  renderDropDownPatient = patienId => {
    const { currentPatientValue, patientIdArray } = this.state;

    console.log("render maethod:", this.state.patientIdArray);
    const patientArray = this.state.patientIdArray.map((element, index) => {
      //console.log("element:", index, element.toNumber());
      var element1 = element.toNumber().toString();
      return {
        key: index,
        text: element1,
        value: element1
      };
    });
    // const options = patientArray.map((element1, index) => {
    //   return { key: index, text: element1, value: element1 };
    // });
    // console.log("options :", options);
    // console.log("patient Array:", patientArray);
    //
    // { key: index, text:element.toNumber() , value: element.toNumber() },
    // { key: 2, text: "Choice 2", value: 2 },
    // { key: 3, text: "Choice 3", value: 3 }
    // ];
    return (
      <Dropdown
        clearable
        options={patientArray}
        selection
        search
        required
        value={currentPatientValue}
        onChange={this.handlePatientChange}
      />
    );
  };
  renderDropDownDoctor = doctorId => {
    const { currentDoctorValue } = this.state;
    console.log("render maethod:", this.state.doctorIdArray);
    const doctorArray = this.state.doctorIdArray.map((element, index) => {
      //console.log("element:", index, element.toNumber());
      var element1 = element.toNumber().toString();
      return {
        key: index,
        text: element1,
        value: element1
      };
    });
    console.log("patient Array:", doctorArray);
    const options = [
      { key: 1, text: "Choice 1", value: 1 },
      { key: 2, text: "Choice 2", value: 2 },
      { key: 3, text: "Choice 3", value: 3 }
    ];
    console.log("OPTIONS:", options);
    return (
      <Dropdown
        clearable
        options={doctorArray}
        selection
        search
        value={currentDoctorValue}
        onChange={this.handleDoctorChange}
      />
    );
  };

  genderPatientRender = () => {
    const options = [
      { key: 1, text: "Male", value: "Male" },
      { key: 2, text: "Female", value: "Female" },
      { key: 3, text: "Other", value: "Other" }
    ];
    return (
      <Dropdown
        clearable
        options={options}
        selection
        search
        value={this.state.patientGender}
        onChange={this.onGenderPatientHandle}
      />
    );
  };

  genderDoctorRender = () => {
    const options = [
      { key: 1, text: "Male", value: "Male" },
      { key: 2, text: "Female", value: "Female" },
      { key: 3, text: "Other", value: "Other" }
    ];
    return (
      <Dropdown
        clearable
        options={options}
        selection
        search
        value={this.state.doctorGender}
        onChange={this.onGenderDoctorHandle}
      />
    );
  };

  renderTabs() {
    const panes = [
      {
        menuItem: "Add Patient",
        render: () => (
          <Tab.Pane attached={false}>
            <h1>Patient Information</h1>
            <Form
              onSubmit={this.addPatient}
              error={!!this.state.errorMessagePatient}
            >
              <Form.Group widths="equal">
                <Form.Field required>
                  <label>Patient ID</label>
                  <Input
                    value={this.state.patientId}
                    onChange={this.onPatientIdHandle}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Patient Name</label>
                  <Input
                    value={this.state.patientName}
                    onChange={this.onPatientHandle}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Patient Gender</label>
                  {this.genderPatientRender()}
                </Form.Field>
                <Form.Field>
                  <label>Patient Age</label>
                  <Input
                    value={this.state.patientAge}
                    onChange={this.onAgeHandle}
                  />
                </Form.Field>
              </Form.Group>

              <Form.Field required>
                <label>Account</label>
                <Input
                  value={this.state.patientAccount}
                  onChange={this.onPatientAccountHandle}
                />
              </Form.Field>
              <Message
                error
                header="Oops..!"
                content={this.state.errorMessagePatient}
              />

              <Button loading={this.state.loading} primary>
                {" "}
                Add Patient{" "}
              </Button>
            </Form>
          </Tab.Pane>
        )
      },
      {
        menuItem: "Add Doctor",
        render: () => (
          <Tab.Pane attached={false}>
            <h1>Doctor Information</h1>

            <Form
              onSubmit={this.addDoctor}
              error={!!this.state.errorMessageDoctor}
            >
              <Form.Group widths="equal">
                <Form.Field required>
                  <label>Doctor ID</label>
                  <Input
                    value={this.state.doctorId}
                    onChange={this.onDoctorIdHandle}
                  />
                </Form.Field>

                <Form.Field>
                  <label>Doctor Name</label>
                  <Input
                    value={this.state.doctorName}
                    onChange={this.onDoctorHandle}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Doctor Gender</label>
                  {this.genderDoctorRender()}
                </Form.Field>
                <Form.Field>
                  <label>Doctor Qualification</label>
                  <Input
                    value={this.state.doctorQualification}
                    onChange={this.onQualificationHandle}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Field required>
                <label>Account</label>
                <Input
                  value={this.state.doctorAccount}
                  onChange={this.onDoctorAccountHandle}
                />
              </Form.Field>
              <Message
                error
                header="Oops..!"
                content={this.state.errorMessageDoctor}
              />
              <Button loading={this.state.loading} primary>
                {" "}
                Add Doctor{" "}
              </Button>
            </Form>
          </Tab.Pane>
        )
      },
      {
        menuItem: "Create Appointment",
        render: () => (
          <Tab.Pane attached={false}>
            <h1>Create Appointment</h1>
            <Form
              onSubmit={this.onAppointmentSubmit}
              error={!!this.state.errorMessageAppointment}
            >
              <Form.Group widths="equal">
                <Form.Field required>
                  <label>Appointment Id</label>
                  <Input
                    value={this.state.appointmentId}
                    onChange={this.onAppointmentId}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Appointment Date </label>
                  <Input
                    action={{
                      color: "teal",
                      icon: "calendar",
                      onClick: () => this.setState({ dateTimeOpen: true })
                    }}
                    actionPosition="left"
                    value={moment(this.state.myDate).format("LLL")}
                    onClick={event =>
                      this.setState({
                        dateTimeOpen: true,
                        myDate: event.target.value
                      })
                    }
                    disabled={this.state.dateTimeOpen}
                    fluid
                  />
                  {this.state.dateTimeOpen && (
                    <DatetimePicker
                      onChange={value => {
                        this.setState({ myDate: value, dateTimeOpen: false });
                        this.setState({
                          date: moment(this.state.myDate).format("LLL")
                        });
                      }}
                      moment={this.myDate}
                      time={true}
                    />
                  )}
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Patient ID</label>
                  {this.renderDropDownPatient()}
                </Form.Field>

                <Form.Field>
                  <label>Doctor ID</label>
                  {this.renderDropDownDoctor()}
                </Form.Field>
              </Form.Group>
              <Form.Field>
                <Form.TextArea
                  label="Chep Complaint"
                  rows={2}
                  placeholder="write patient disease..."
                  onChange={this.onTextArea}
                />
              </Form.Field>
              <Message
                error
                header="Oops..!"
                content={this.state.errorMessageAppointment}
              />
              <Button loading={this.state.loading} primary>
                {" "}
                Create Appointment{" "}
              </Button>
            </Form>
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
      }
    ];
    return <Tab menu={{ attached: false }} panes={panes} />;
  }

  renderHospital() {
    const { address, hospitalName, adminName, manager } = this.props;
    return (
      <div>
        <div>Hospital Name: {hospitalName}</div>
        <div>Admin Name: {adminName}</div>
        <div>Account: {manager}</div>
      </div>
    );
  }

  render() {
    return (
      <Layout>
        <div>
          <Button
            floated="right"
            primary
            content="Show admin View"
            onClick={this.onUnlockView}
          />
          <div style={{ marginLeft: 300 }}>
            <h1>Hospital Details</h1>
          </div>
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
            {this.renderHospital()}
          </div>
        </div>
        <hr />
        <ToggleDisplay show={this.state.show}>
          <h1 style={{ marginLeft: 300 }}>Admin Panel</h1>
          {this.renderTabs()}
          <hr />
        </ToggleDisplay>
        <ToggleDisplay show={!this.state.show}>
          <div>
            <h1 style={{ color: "red" }}>{this.state.notAdmin}</h1>
          </div>
        </ToggleDisplay>
      </Layout>
    );
  }
}

export default hospitalDetails;
