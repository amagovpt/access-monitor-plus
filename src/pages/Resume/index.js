import { useContext, useEffect, useState } from "react";
import { Breadcrumb, Gauge, LoadingComponent, StatsTable, TableComponent } from "ama-design-system";

import { api } from "../../config/api";
import { processData } from "../../services";
import { ButtonsActions } from "./_components/buttons-revalidation";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { downloadCSV } from "../../utils/utils";
import { ThemeContext } from "../../context/ThemeContext";
import { optionForAccordion, callbackImgT } from "./utils";
import "./styles.css";

import { pathURL } from "../../App";

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
        navigate(`${pathURL}error`)
      }
    };

    fetchData();
  }, [content, contentHtml, decodedUrl]);

  const reRequest = () => {
    if (content === "html") {
      const currentURL = window.location.pathname + window.location.search;

      if (`${pathURL}results/${content}` === currentURL) {
        window.location.href = currentURL;
      } else {
        navigate(`${pathURL}results/${content}`, { state: { contentHtml } });
      }
    } else {
      const encodedURL = encodeURIComponent(content);
      const currentURL = window.location.pathname + window.location.search;

      if (`${pathURL}results/${encodedURL}` === currentURL) {
        window.location.href = currentURL;
      } else {
        navigate(`${pathURL}results/${encodedURL}`);
      }
    }
  };

  const seeCode = () => {
    const encodedURL = encodeURIComponent(content);
    navigate(`${pathURL}results/${encodedURL}/code`, {
      state: {
        content: dataProcess,
        original: originalData,
        code: pageCode,
      },
    });
  };

  function setAllDataResult(ele, allData) {
    setAllData(allData);
    const type = allData.rawUrl;

    if (type === "") {
      const content = "html";
      navigate(`${pathURL}results/${content}/${ele}`);
    } else {
      const encodedURL = encodeURIComponent(allData?.rawUrl);
      navigate(`${pathURL}results/${encodedURL}/${ele}`);
    }
  }

  const dataBreadCrumb = [
    {
      title: "Acessibilidade.gov.pt",
      href: "https://www.acessibilidade.gov.pt/",
    },
    { title: "Access Monitor", href: `${pathURL}` },
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
        <Breadcrumb data={dataBreadCrumb} darkTheme={theme} tagHere={t("HEADER.DROPDOWN.youarehere")} />
      </div>

      <div className="report_container">
        <h1 className="report_container_subtitle">{t("RESULTS.title")}</h1>
        {loadingProgress ? (
          <section className={`loading_container bg-white`}>
            <LoadingComponent loadingText={t("MISC.loading")} darkTheme={theme} />
          </section>
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
                <Gauge percentage={scoreDataFormatted} darkTheme={theme} title={t("RESULTS.summary.score")}  />
              </div>
              <div className="resume_info_about_uri d-flex flex-column gap-4">
                <div className="d-flex flex-column">
                  <span>URL</span>
                  <span className="break_url">{dataProcess?.metadata?.url}</span>
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
                <StatsTable
                  data={{data: dataProcess}}
                  darkTheme={theme}
                  ok={t("RESULTS.summary.table.labels.ok")}
                  warning={t("RESULTS.summary.table.labels.warn")}
                  error={t("RESULTS.summary.table.labels.err")}
                  title={t("RESULTS.summary.table.title")}
                  caption={t("RESULTS.summary.metadata.caption")}
                  type={t("RESULTS.summary.table.typeLabel")}
                />
              </div>
            </div>
          </section>
          <section className="bg-white avaliation_container">
            <h2 className="avaliation_title mb-3">{t("RESULTS.results.title")}</h2>
            <TableComponent
              data={optionForAccordion(t, dataProcess)}
              onClick={(ele) => setAllDataResult(ele, originalData?.result?.data)}
              imageTitlesCallback={(img) => callbackImgT(t, img)}
              caption={t("RESULTS.results.caption")}
              col1={t("RESULTS.results.practice")}
              col2={t("RESULTS.results.lvl")}
              col3={t("RESULTS.results.details")}
              lvlTitle={t("RESULTS.results.lvl") + ": "}
              ariaLabel={t("RESULTS.results.details")}
              darkTheme={theme}
              ariaLabels={{
                button: t("RESULTS.results.details"),
                A: t("RESULTS.results.ariaLabels.A"),
                AA: t("RESULTS.results.ariaLabels.AA"),
                AAA: t("RESULTS.results.ariaLabels.AAA")
              }}
            />
          </section>
        </>
      )}
    </div>
  );
}
