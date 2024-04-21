import React from "react";
import PropTypes from "prop-types";
import { Tabs as BTabs, Tab, Row, Col, Nav } from "react-bootstrap";

import "./styles.css";

const Tabs = ({ tabs, vertical, ...props }) => {
  return (
    <div className={`tabs-container ${vertical ? "vertical-tabs" : ""}`}>
      {vertical ? (
        <Tab.Container {...props}>
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                {tabs.map((item) => (
                  <Nav.Item key={item.eventKey} className="fill-space">
                    <Nav.Link eventKey={item.eventKey}>{item.title}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                {tabs.map((item) => (
                  <Tab.Pane key={item.eventKey} eventKey={item.eventKey}>
                    {item.component}
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      ) : (
        <BTabs {...props}>
          {tabs.map((item) => (
            <Tab
              key={item.eventKey}
              eventKey={item.eventKey}
              title={item.title}
              disabled={item.disabled}
            >
              {item.component}
            </Tab>
          ))}
        </BTabs>
      )}
    </div>
  );
};

Tabs.defaultProps = {
  tabs: [],
  className: "mb-3",
  defaultActiveKey: "",
  vertical: false,
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(Object),
  className: PropTypes.string,
  defaultActiveKey: PropTypes.string,
  vertical: PropTypes.bool,
};

export default Tabs;
export { Tabs };
