import React from "react";
import PropTypes from "prop-types";
import { Accordion as BAccordion } from "react-bootstrap";

import "./styles.css";

const { Item, Header, Body } = BAccordion;

const Accordion = ({ options, textColor, ...props }) => {
  const accordionStyle = {
    // minHeight: "auto",
  };

  const headerStyle = {
    color: textColor,
  };

  return (
    <BAccordion {...props} style={accordionStyle}>
      {options.map((item) => (
        <Item key={item.id} eventKey={item.id}>
          <Header style={headerStyle}>{item.title}</Header>
          <Body>{item.component}</Body>
        </Item>
      ))}
    </BAccordion>
  );
};

Accordion.defaultProps = {
  options: [],
  // backgroundColor: "#ffffff",
  // textColor: "#000000",
};

Accordion.propTypes = {
  options: PropTypes.arrayOf(Object),
  // textColor: PropTypes.string,
};

export default Accordion;
export { Accordion };
