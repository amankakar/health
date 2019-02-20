import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link } from "../routes";
export default () => {
  return (
    <Menu style={{ marginTop: 10 }}>
      <Link route="../">
        <a className="item">Health Care Management System</a>
      </Link>
      <Link route="/doctor">
        <a className="item"> doctor </a>
      </Link>
    </Menu>
  );
};
