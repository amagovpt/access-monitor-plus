import { useContext, useEffect, useState } from "react";
import {
  Breadcrumb,
  Gauge,
  TableAlternative,
  TableComponent,
} from "../../components/index";
import { ButtonsActions } from "./_components/buttons-revalidation";
import "./styles.css";
import { useLocation, useNavigate } from "react-router-dom";
import { processData } from "../../services";
import { LoadingComponent } from "./_components/loading";
import { api } from "../../config/api";

import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../context/ThemeContext";

import { downloadCSV } from "../../utils/utils";

import localJson from "../../utils/data.json";

export let tot;

export default function Resume({ setAllData, setEle }) {
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [dataProcess, setDataProcess] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [originalData, setOriginalData] = useState([]);
  const content = location.state?.content || null;
  const typeRequest = location.state?.type || null;
  const [pageCode, setPageCode] = useState();

  const { theme } = useContext(ThemeContext);

  const themeClass = theme === "light" ? "" : "dark_mode-resume";

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoadingProgress(true);
  //     try {
  //       const response =
  //         typeRequest === "html"
  //           ? await api.post("/eval/html", { html: content })
  //           : await api.get(`/eval/${content}`);
  //       setOriginalData(response.data);

  //       console.log("Responseeee", response);

  //       console.log("Response", response.data.result.data.tot);

  //       setDataProcess(processData(response.data?.result?.data?.tot));

  //       tot = response.data.result.data.tot;

  //       setPageCode(response.data?.result?.pagecode || "html");
  //       setLoadingProgress(false);
  //     } catch (error) {
  //       console.error("Erro", error);
  //       setLoadingProgress(false);
  //     }
  //   };
  //   fetchData();
  // }, [content, typeRequest]);

  // LOCAL

  useEffect(() => {
    const fetchData = async () => {
      setLoadingProgress(true);
      try {
        const response = localJson;
        setOriginalData(response);

        console.log("Responseeee", response);

        console.log("Response2zyyy", response?.result?.data?.tot);

        setDataProcess(processData(response?.result?.data?.tot));

        tot = response?.result?.data.tot;

        setPageCode(response?.result?.pagecode || "html");
        setLoadingProgress(false);
      } catch (error) {
        console.error("Erro", error);
        setLoadingProgress(false);
      }
    };
    fetchData();
  }, []);

  const reRequest = () => {
    navigate("/resumo", { state: { content: content, type: typeRequest } });
  };

  const seeCode = () => {
    navigate("/resumo/code", {
      state: { content: dataProcess, original: originalData, code: pageCode },
    });
  };

  const dataBreadCrumb = [
    {
      title: "Acessibilidade.gov.pt",
      href: "https://www.acessibilidade.gov.pt/",
    },
    { title: "Access Monitor", href: "/" },
    {
      title: dataProcess?.metadata?.url || "html",
      href: dataProcess?.metadata?.url,
    },
  ];

  const scoreData = dataProcess?.metadata?.score;
  let scoreDataFormatted = scoreData && scoreData.toString();

  if (scoreDataFormatted === "10.0") {
    scoreDataFormatted = "10";
  }

  return (
    <div className={`container ${themeClass}`}>
      <div className="link_breadcrumb_container">
        <Breadcrumb data={dataBreadCrumb} />
      </div>

      {/* <Gauge percentage={5} /> */}

      <div className="report_container">
        <div className="acess_monitor">AcessMonitor</div>
        <h1 className="report_container_title">{dataProcess?.metadata?.url}</h1>
        <p className="report_container_subtitle">{t("RESULTS.title")}</p>
        {loadingProgress ? (
          <LoadingComponent />
        ) : (
          <ButtonsActions
            reRequest={reRequest}
            seeCode={seeCode}
            downloadCSV={() => downloadCSV(dataProcess, originalData, t)}
          />
        )}
      </div>
      {!loadingProgress && (
        <>
          <section className="sumary_container bg-white">
            <h2>{t("RESULTS.summary.title")}</h2>
            <div className="d-flex flex-row mt-5 mb-5 justify-content-between container_uri_chart">
              <div className="chart_container">
                <Gauge percentage={scoreDataFormatted} />
              </div>
              <div className="resume_info_about_uri">
                <div className="d-flex flex-column">
                  <span>URI</span>
                  <span>{dataProcess?.metadata?.url}</span>
                </div>
                <br />
                <div className="d-flex flex-column">
                  <span>{t("RESULTS.summary.metadata.title_label")}</span>
                  <span>{dataProcess?.metadata?.title}</span>
                </div>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-between size_and_table_container">
              <div className="size_container">
                <div>
                  <span>{dataProcess?.metadata?.n_elements}</span> <br />
                  <span>{t("RESULTS.summary.metadata.n_elements_label")}</span>
                </div>
                <br />
                <div>
                  <span>{dataProcess?.metadata?.size}</span> <br />
                  <span>{t("RESULTS.summary.metadata.page_size_label")}</span>
                </div>
              </div>
              <div className="table_container_sumary">
                <TableAlternative data={dataProcess} />
              </div>
            </div>
          </section>
          <section className="bg-white avaliation_container">
            <h2 className="avaliation_title">{t("RESULTS.results.title")}</h2>
            <TableComponent
              data={dataProcess}
              allData={originalData?.result?.data}
              setAllData={setAllData}
              setEle={setEle}
            />
          </section>
        </>
      )}
    </div>
  );
}
