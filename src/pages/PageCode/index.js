import { Breadcrumb } from "../../components/index";
import { ButtonsActions } from "./_components/buttons-revalidation";
import "./styles.css";
import { useLocation, useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

import { downloadCSV } from "../../utils/utils";

export default function Resume() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { theme } = useContext(ThemeContext);

  const themeClass = theme === "light" ? "" : "dark_mode-code";

  const dataProcess = location.state?.content || null;
  const originalData = location.state?.original || null;

  const code = location.state?.code || null;

  const handleGoBack = () => {
    navigate(-1);
  };

  const dataBreadCrumb = [
    {
      title: "Acessibilidade.gov.pt",
      href: "https://www.acessibilidade.gov.pt/",
    },
    { title: "Access Monitor", href: "/amp" },
    {
      title: dataProcess?.metadata?.url || "html",
      href: "",
    },
    {
      title: t("HEADER.NAV.code"),
    },
  ];

  return (
    <div className={`container ${themeClass} `}>
      <div className="link_breadcrumb_container">
        <Breadcrumb data={dataBreadCrumb} onClick={handleGoBack} />
      </div>
      <div className="report_container">
        <div className="acess_monitor" lang="en">
          AccessMonitor
        </div>
        <h1 className="report_container_title">
          {dataProcess?.metadata?.url || "html"}
        </h1>
        <p className="report_container_subtitle">{t("HEADER.NAV.code")}</p>
        <ButtonsActions
          downloadCSV={() => downloadCSV(dataProcess, originalData, t)}
          handleGoBack={() => handleGoBack()}
          themeClass={themeClass}
        />
      </div>
      <section className="html_code">
        <pre>{code || `<></>`}</pre>
      </section>
    </div>
  );
}
