import React, {useState} from "react";
import PropTypes from "prop-types";
import { Accordion as BAccordion } from "react-bootstrap";

import "./styles.css";

const { Item, Header, Body } = BAccordion;

const Accordion = ({ options, textColor, id, ...props }) => {
  const [open, setOpen] = useState(false);

  const accordionStyle = {
    // minHeight: "auto",
  };

  const headerStyle = {
    color: textColor,
  };

  const toggleShow = () => {
    const parentElement = document.getElementById(id)
    const childElement = document.querySelector('.accordion-button')

    if(!open) {
      setOpen(true)
      parentElement.classList.add("show")
      childElement.classList.add("show")
    } else {
      setOpen(false)
      parentElement.classList.remove("show")
      childElement.classList.remove("show") 
    }
  }

  return (
    <BAccordion {...props} style={accordionStyle} onClick={() => toggleShow()}>
      {options.map((item) => (
        <Item key={item.id} eventKey={item.id}>
          <Header id={item.id} style={headerStyle}>{item.title}</Header>
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
