/* eslint-disable react-hooks/exhaustive-deps */
import { getTestResults } from "../../services";
import { useEffect, useState, useContext } from "react";
import { TableDetails } from "./_components/TableDetails";
import "./styles.css";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../context/ThemeContext";
import { Breadcrumb, Icon, LoadingComponent } from "ama-design-system";

import { processData } from "../../services";
import { api } from "../../config/api";

import { useParams, useNavigate, useLocation } from "react-router-dom";

export let tot;

export default function Details({ allData, setAllData }) {
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { details } = useParams();
  const { theme } = useContext(ThemeContext);

  const [loadingProgress, setLoadingProgress] = useState(true);

  const themeClass = theme === "light" ? "" : "dark_mode-details";

  const handleGoBack = () => {
    const test = location.pathname.split("/")
    navigate(`/amp/results/${test[3]}`);
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

  const removeProtocol = (url) => {
    return url.replace(/^(https?:\/\/)?(www\.)?/, "");
  };

  function getDetails() {
    const response = getTestResults(details, allData);
    setDataTable(response);
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoadingProgress(true);

      try {
        if(allData && allData.length > 0) {
          getDetails();
          setLoadingProgress(false);
          return;
        }
        const storedData = localStorage.getItem("evaluation");
        const storedUrl = localStorage.getItem("evaluationUrl");
        const url = location.pathname.split("/")[3]
        const currentUrl = removeProtocol(url.split("%2F")[2])

        if (storedData && storedUrl === currentUrl) {
          const parsedStoredData = JSON.parse(storedData);
          setAllData(parsedStoredData.result?.data);
          setLoadingProgress(false);
          tot = parsedStoredData?.result?.data?.tot;
          return;
        }
        const response = await api.get(`/eval/${currentUrl}`)
        if (url !== "html") {
          localStorage.setItem("evaluation", JSON.stringify(response.data));
          localStorage.setItem("evaluationUrl", currentUrl);
        }
        tot = response?.data?.result?.data.tot;

        setAllData(response.data?.result?.data);
        getDetails();
        setLoadingProgress(false);
      } catch (error) {
        console.error("Erro", error);
        setLoadingProgress(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    getDetails();
  }, [allData]);

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

        {loadingProgress ? (
          <section className={`loading_container bg-white`}>
            <LoadingComponent loadingText={t("MISC.loading")} darkTheme={theme} />
          </section>
        ) : 
          <>
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
          </>
        }
      </div>
    </>
  );
}
