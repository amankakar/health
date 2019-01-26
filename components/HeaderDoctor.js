import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link } from "../routes";
export default () => {
  return (
    <Menu style={{ marginTop: 10 }}>
      <Link route="/doctor/">
        <a className="item">Health Care Management System</a>
      </Link>
    </Menu>
  );
};
