import { useContext, useEffect, useState } from "react";
import {
  Breadcrumb,
  Gauge,
  TableAlternative,
  TableComponent,
} from "../../components/index";

import { api } from "../../config/api";
import { processData } from "../../services";
import { LoadingComponent } from "./_components/loading";
import { ButtonsActions } from "./_components/buttons-revalidation";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { downloadCSV } from "../../utils/utils";
import { ThemeContext } from "../../context/ThemeContext";
import "./styles.css";

export let tot;

export default function Resume({ setAllData, setEle }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [dataProcess, setDataProcess] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [originalData, setOriginalData] = useState([]);
  const [pageCode, setPageCode] = useState();
  const contentHtml = location.state?.contentHtml || null;
  const { content } = useParams();

  const { theme } = useContext(ThemeContext);
  const themeClass = theme === "light" ? "" : "dark_mode-resume";

  const removeProtocol = (url) => {
    return url.replace(/^(https?:\/\/)?(www\.)?/, "");
  };

  const decodedUrl = removeProtocol(content);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingProgress(true);

      try {
        const storedData = localStorage.getItem("evaluation");
        const storedUrl = localStorage.getItem("evaluationUrl");

        const currentUrl = content === "html" ? contentHtml : decodedUrl;

        if (storedData && storedUrl === currentUrl) {
          const parsedStoredData = JSON.parse(storedData);
          setOriginalData(parsedStoredData);
          setDataProcess(processData(parsedStoredData?.result?.data?.tot));
          setPageCode(parsedStoredData?.result?.pagecode || "html");
          setLoadingProgress(false);

          tot = parsedStoredData?.result?.data?.tot;

          return;
        }

        const response =
          content === "html"
            ? await api.post("/eval/html", { html: contentHtml })
            : await api.get(`/eval/${decodedUrl}`);

        if (content !== "html") {
          localStorage.setItem("evaluation", JSON.stringify(response.data));
          localStorage.setItem("evaluationUrl", currentUrl);
        }

        tot = response?.data?.result?.data.tot;

        setOriginalData(response.data);
        setDataProcess(processData(response.data?.result?.data?.tot));
        setPageCode(response.data?.result?.pagecode || "html");
        setLoadingProgress(false);
      } catch (error) {
        console.error("Erro", error);
        setLoadingProgress(false);
      }
    };

    fetchData();
  }, [content, contentHtml, decodedUrl]);

  const reRequest = () => {
    if (content === "html") {
      const currentURL = window.location.pathname + window.location.search;

      if (`/amp/results/${content}` === currentURL) {
        window.location.href = currentURL;
      } else {
        navigate(`/amp/results/${content}`, { state: { contentHtml } });
      }
    } else {
      const encodedURL = encodeURIComponent(content);
      const currentURL = window.location.pathname + window.location.search;

      if (`/amp/results/${encodedURL}` === currentURL) {
        window.location.href = currentURL;
      } else {
        navigate(`/amp/results/${encodedURL}`);
      }
    }
  };

  const seeCode = () => {
    const encodedURL = encodeURIComponent(content);
    navigate(`/amp/results/${encodedURL}/code`, {
      state: {
        content: dataProcess,
        original: originalData,
        code: pageCode,
      },
    });
  };

  const dataBreadCrumb = [
    {
      title: "Acessibilidade.gov.pt",
      href: "https://www.acessibilidade.gov.pt/",
    },
    { title: "Access Monitor", href: "/amp" },
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

      <div className="report_container">
        <h1 className="report_container_subtitle">{t("RESULTS.title")}</h1>
        {loadingProgress ? (
          <LoadingComponent />
        ) : (
          <ButtonsActions
            reRequest={reRequest}
            seeCode={seeCode}
            downloadCSV={() => downloadCSV(dataProcess, originalData, t)}
            href={dataProcess?.metadata?.url}
            themeClass={themeClass}
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
              <div className="resume_info_about_uri d-flex flex-column gap-4">
                <div className="d-flex flex-column">
                  <span>URL</span>
                  <span>{dataProcess?.metadata?.url}</span>
                </div>

                <div className="d-flex flex-column">
                  <span>{t("RESULTS.summary.metadata.title_label")}</span>
                  <span>{dataProcess?.metadata?.title}</span>
                </div>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-between size_and_table_container">
              <div className="size_container d-flex flex-column gap-4">
                <div className="d-flex flex-column">
                  <span>{dataProcess?.metadata?.n_elements}</span>
                  <span>{t("RESULTS.summary.metadata.n_elements_label")}</span>
                </div>

                <div className="d-flex flex-column">
                  <span>{dataProcess?.metadata?.size}</span>
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
