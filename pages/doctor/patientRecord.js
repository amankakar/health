import React, { Component } from "react";
import Layout from "../../components/doctorLayout";
import ReceptionistFactory from "../../build/contracts/ReceptionsitFactory.json";
import Patient from "../../build/contracts/Patient.json";
import PatientRecord from "../../components/patientRecord";
import truffleContract from "truffle-contract";
import web3 from "../../ethereum/web3";
import { Table } from "semantic-ui-react";
class patientRecord extends Component {
  static async getInitialProps(props) {
    const patientId = props.query.patientId;

    const factory = truffleContract(ReceptionistFactory);
    factory.setProvider(web3.currentProvider);
    const instanceFactory = await factory.deployed();

    const patient = truffleContract(Patient);
    patient.setProvider(web3.currentProvider);

    const patientAddress = await instanceFactory.patientIdToAddress.call(
      props.query.patientId
    );

    const patientContract = await patient.at(patientAddress);
    console.log(patientAddress);

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
      patientId,
      appointmentListData: appointmentListData
    };
  }

  renderRow() {
    return this.props.appointmentListData.map((appointment, index) => {
      return <PatientRecord key={index} appointment={appointment} />;
    });
  }
  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <div>
          <h1>Patient Record</h1>
          <Table>
            <Header>
              <Row>
                <HeaderCell>Date</HeaderCell>
                <HeaderCell>Chief Complaint</HeaderCell>
                <HeaderCell> Hash</HeaderCell>
              </Row>
            </Header>

            <Body>{this.renderRow()}</Body>
          </Table>
        </div>
      </Layout>
    );
  }
}
export default patientRecord;
