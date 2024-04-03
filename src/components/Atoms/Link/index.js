import PropTypes from "prop-types";

import "./styles.css";

export function Link({ to, text, children, iconLeft, iconRight, ...rest }) {
  return (
    <div className="link-container">
      {iconLeft && <>{iconLeft}</>}
      <a href={to} {...rest}>
        {children || <span dangerouslySetInnerHTML={{ __html: text }} />}
      </a>
      {iconRight && <>{iconRight}</>}
    </div>
  );
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string,
  children: PropTypes.node,
  iconLeft: PropTypes.object,
  iconRight: PropTypes.object,
};
