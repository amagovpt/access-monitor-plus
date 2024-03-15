import React from "react";
import PropTypes from "prop-types";
import { Accordion as BAccordion } from "react-bootstrap";

const { Item, Header, Body } = BAccordion;

const Accordion = ({ options, backgroundColor, textColor, ...props }) => {
  const accordionStyle = {
    backgroundColor: backgroundColor,
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
  backgroundColor: "#ffffff",
  textColor: "#000000",
};

Accordion.propTypes = {
  options: PropTypes.arrayOf(Object),
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default Accordion;
export { Accordion };
