import React from "react";
import PropTypes from "prop-types";
import { Breadcrumb as BBreadcrumb } from "react-bootstrap";

import "./styles.css";
import { useTranslation } from "react-i18next";

const { Item } = BBreadcrumb;

const Breadcrumb = ({ data, onClick, ...props }) => {
  const { t } = useTranslation();

  const size = data.length - 1;
  const handleOnClick = (item) => (e) => {
    if (item.href === "") {
      e.preventDefault();
      onClick(item, e);
    }
  };
  return (
    <nav>
      <BBreadcrumb {...props}>
        {data.map((item, index) => (
          <Item
            key={`id-${index}`}
            href={item.href === "" ? "" : item.href}
            active={index === size}
            onClick={handleOnClick(item)}
            aria-label={
              index === size ? t("HEADER.DROPDOWN.youarehere") : undefined
            }
          >
            {item.title}
          </Item>
        ))}
      </BBreadcrumb>
    </nav>
  );
};

Breadcrumb.defaultProps = {
  data: [],
  onClick: () => {},
};

Breadcrumb.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
};

export default Breadcrumb;
export { Breadcrumb };
