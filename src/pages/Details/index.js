/* eslint-disable react-hooks/exhaustive-deps */
import { getTestResults } from "../../services";
import { useEffect, useState } from "react";
import { TableDetails } from "./_components/TableDetails";
import "./styles.css";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import { Breadcrumb, Icon } from "ama-design-system";

import { useParams, useNavigate } from "react-router-dom";

export default function Details({ allData }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { details } = useParams();
  const { theme } = useContext(ThemeContext);

  const themeClass = theme === "light" ? "" : "dark_mode-details";

  const handleGoBack = () => {
    navigate(-1);
  };

  const url = allData?.rawUrl;
  const textHeading = t(`ELEMS.${details}`);
  const [dataTable, setDataTable] = useState([]);

  const dataBreadCrumb = [
    {
      title: "Acessibilidade.gov.pt",
      href: "/",
    },
    { title: "Access Monitor", href: "/amp" },
    {
      title: url || "html",
      href: "",
    },

    {
      title: textHeading,
      href: "#",
    },
  ];

  function getDetails() {
    const response = getTestResults(details, allData);
    setDataTable(response);
  }

  useEffect(() => {
    getDetails();
  }, []);

  let iconName;

  if (dataTable?.result === "R") {
    iconName = "AMA-Wrong-Line";
  } else if (dataTable?.result === "Y") {
    iconName = "AMA-Middle-Line";
  } else {
    iconName = "AMA-Check-Line";
  }

  let tdClassName;

  if (dataTable?.result === "R") {
    tdClassName = "error-cell";
  } else if (dataTable?.result === "Y") {
    tdClassName = "warning-cell";
  } else {
    tdClassName = "success-cell";
  }

  return (
    <>
      <div className={`container ${themeClass}`}>
        <div className="link_breadcrumb_container">
          <Breadcrumb data={dataBreadCrumb} onClick={handleGoBack} darkTheme={theme} tagHere={t("HEADER.DROPDOWN.youarehere")} />
        </div>

        <div className="report_container">
          <h1 className="report_container_title mb-5">
            {t("ELEMENT_RESULTS.subtitle")}
          </h1>
        </div>

        <div className="bg-white show_details">
          <div className="d-flex flex-row justify-content-between align-items-center show_details-container">
            <div className="d-flex flex-row align-items-center">
              <div className={`d-flex align-items-center justify-content-center m-2 p-3 ${tdClassName}`}>
                <Icon name={iconName} />
              </div>

              <span
                className="textHeader ama-typography-body-large bold"
                dangerouslySetInnerHTML={{ __html: textHeading }}
              />
            </div>

            <div className="result_left_container">
              <span className="ama-typography-display-6 bold p-2 ps-4">{dataTable?.size}</span>
              <span className="ama-typography-body p-2">{t("ELEMENT_RESULTS.total_elements")}</span>
            </div>
          </div>
        </div>

        <div className="tabContent_container-details">
          <TableDetails data={dataTable?.elements} />
        </div>

      </div>
    </>
  );
}
