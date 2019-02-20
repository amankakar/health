import React, { Component } from "react";
import { Link } from "../routes";

import Layout from "../components/patientLayout";
class index extends Component {
  render() {
    return (
      <Layout>
        <div>
          <Link route="/patient">
            <a>Patient Module</a>
          </Link>
        </div>
      </Layout>
    );
  }
}
export default index;
