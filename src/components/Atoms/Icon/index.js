import React from "react";
import "./style.css";
import "./icon.css";
import { useTranslation } from "react-i18next";

const Icon = ({ name }) => {
  const { t } = useTranslation();
  
  return <i title={t(`RESULTS.results.image_title.${name}`)} className={`icon-${name}`}></i>;
};

export { Icon };
