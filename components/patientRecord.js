import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { Link } from "../routes";

class PatientRecord extends Component {
  onAppointmentComplete = () => {
    if (appointment.hash) return true;
    else return false;
  };
  render() {
    const { Row, Cell } = Table;
    const { appointment } = this.props;
    const hash = appointment.hash;
    return (
      <Row positive={appointment.completed} disabled={!appointment.completed}>
        <Cell>{appointment.date}</Cell>
        <Cell>{appointment.chiefComplaint}</Cell>
        <Cell>
          <Link route={`../../doctor/record/${hash}`}>
            <a>{hash}</a>
          </Link>
        </Cell>
      </Row>
    );
  }
}
export default PatientRecord;
