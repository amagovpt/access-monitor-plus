import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

import "./styles.css";

let RadioGroup = ({ data, name, inline, value, onChange, ...props }) => {
  const handleOnCLick = (id) => (e) => {
    onChange(id, e);
  };

  return (
    <div className="mb-3">
      {data.map((item) => (
        <Form.Check
          key={item.id}
          id={item.id}
          label={item.name}
          inline={inline}
          name={name}
          disabled={item.disabled}
          checked={value === item.id}
          type="radio"
          onChange={handleOnCLick(item.id)}
          {...props}
        />
      ))}
    </div>
  );
};

RadioGroup.defaultProps = {
  data: [],
  name: "checkbox-group-name",
  inline: true,
  value: "",
  onChange: () => {},
};

RadioGroup.propTypes = {
  data: PropTypes.arrayOf(Object),
  name: PropTypes.string,
  inline: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

RadioGroup = React.memo(RadioGroup);

export default RadioGroup;
export { RadioGroup };
