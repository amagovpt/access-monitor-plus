import { useEffect, useState } from "react";
import {
  Breadcrumb,
  Gauge,
  TableAlternative,
  TableComponent,
} from "../../components/index";
import { ButtonsActions } from "./_components/buttons-revalidation";
import "./styles.css";
import { useLocation } from "react-router-dom";
import { processData } from "../../services";
import { LoadingComponent } from "./_components/loading";
import { api } from "../../config/api";

export let tot;

export default function Resume({ setAllData, setEle }) {
  const location = useLocation();
  const [dataProcess, setDataProcess] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [originalData, setOriginalData] = useState([]);
  const content = location.state?.content || null;
  const typeRequest = location.state?.type || null;

  useEffect(() => {
    const fetchData = async () => {
      setLoadingProgress(true);
      try {
        const response =
          typeRequest === "html"
            ? await api.post("/eval/html", { html: content })
            : await api.get(`/eval/${content}`);
        setOriginalData(response.data);

        console.log("Response", response.data.result.data.tot);
        setDataProcess(processData(response.data?.result?.data?.tot));

        tot = response.data.result.data.tot;

        console.log("Tot", tot);
        setLoadingProgress(false);
      } catch (error) {
        console.error("Erro", error);
        setLoadingProgress(false);
      }
    };
    fetchData();
  }, [content, typeRequest]);

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

  return (
    <div className="container">
      <div className="link_breadcrumb_container">
        <Breadcrumb data={dataBreadCrumb} />
      </div>
      <div className="report_container">
        <div className="acess_monitor">AcessMonitor</div>
        <h1 className="report_container_title">{dataProcess?.metadata?.url}</h1>
        <p className="report_container_subtitle">
          Relatório de práticas de acessibilidade Web (WCAG 2.1 do W3C)
        </p>
        {loadingProgress ? <LoadingComponent /> : <ButtonsActions />}
      </div>
      {!loadingProgress && (
        <>
          <section className="sumary_container bg-white">
            <h2>Sumário</h2>
            <div className="d-flex flex-row mt-5 mb-5 justify-content-between container_uri_chart">
              <div className="chart_container">
                <Gauge percentage={dataProcess?.metadata?.score} />
              </div>
              <div className="resume_info_about_uri">
                <div className="d-flex flex-column">
                  <span>URI</span>
                  <span>{dataProcess?.metadata?.url}</span>
                </div>
                <br />
                <div className="d-flex flex-column">
                  <span>Title</span>
                  <span>{dataProcess?.metadata?.title}</span>
                </div>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-between size_and_table_container">
              <div className="size_container">
                <div>
                  <span>{dataProcess?.metadata?.n_elements}</span> <br />
                  <span>(x)HTML elements</span>
                </div>
                <br />
                <div>
                  <span>{dataProcess?.metadata?.size}</span> <br />
                  <span>Page size</span>
                </div>
              </div>
              <div className="table_container_sumary">
                <TableAlternative data={dataProcess} />
              </div>
            </div>
          </section>
          <section className="bg-white avaliation_container">
            <h2 className="avaliation_title">Avaliação</h2>
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
