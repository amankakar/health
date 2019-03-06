import React, { Component } from "react";
import { Link } from "../routes";
import Layout from "../components/Layout";
import { Button } from "semantic-ui-react";

class index extends Component {
  render() {
    return (
      <Layout>
        <div>
          <Link route="/hospital">
            <Button primary>Hospitals</Button>
          </Link>

          <Link route="/patient">
            <a>
              <Button primary>Patient</Button>
            </a>
          </Link>

          <Link route="/doctor">
            <Button primary>Doctor</Button>
          </Link>
          <Link route="hospital/register">
            <Button floated="right" primary icon labelPosition="left">
              Register New Admin/Receptionist
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }
}
export default index;
