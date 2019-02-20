import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { Link } from "../routes";

class AppointmentRow extends Component {
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
        <Cell>{appointment.appointmentId.toNumber()}</Cell>
        <Cell>{appointment.patientId.toNumber()}</Cell>
        <Cell>{appointment.doctorId.toNumber()}</Cell>
        <Cell>{appointment.date}</Cell>
        <Cell>{appointment.chiefComplaint}</Cell>
        <Cell>
          <Link route={`patient/record/${hash}`}>
            <a>{hash}</a>
          </Link>
        </Cell>
      </Row>
    );
  }
}
export default AppointmentRow;
