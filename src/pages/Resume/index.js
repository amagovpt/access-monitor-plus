import { useEffect, useState } from "react";

import {
  Breadcrumb,
  Gauge,
  TableAlternative,
  TableComponent,
} from "../../components/index";
import { ButtonsActions } from "./_components/buttons-revalidation";
import "./styles.css";

import { data } from "../../utils/data";

import { processData } from "../../services";

export const tot = data?.result.data.tot;

export default function Resume({ setAllData, setEle }) {
  const [dataProcess, setDataProcess] = useState([]);

  useEffect(() => {
    // const { tot } = data?.result?.data;
    const resultadoProcessamento = processData(tot);
    setDataProcess(resultadoProcessamento);
  }, []);

  const dataBreadCrumb = [
    {
      title: "Acessibilidade.gov.pt",
      href: "/",
    },
    {
      title: "Access Monitor",
      href: "/",
    },
    {
      title: dataProcess?.metadata?.url,
      href: dataProcess?.metadata?.url,
    },
  ];

  return (
    <>
      <div className="container">
        <div className="link_breadcrumb_container">
          <Breadcrumb data={dataBreadCrumb} />
        </div>

        <div className="report_container">
          <div className="acess_monitor">AcessMonitor</div>

          <h1 className="report_container_title">
            {dataProcess?.metadata?.url}
          </h1>

          <p className="report_container_subtitle">
            Relatório de práticas de acessibilidade Web (WCAG 2.1 do W3C)
          </p>

          <ButtonsActions />
        </div>

        <section className="sumary_container bg-white">
          <h2>Sumário</h2>

          <div className="d-flex flex-row mt-5 mb-5 justify-content-between container_uri_chart">
            <div className="chart_container">
              <Gauge percentage={dataProcess?.metadata?.score} />
            </div>

            <div className="resume_info_about_uri">
              <div>
                <span>URI</span> <br />
                <span>{dataProcess?.metadata?.url}</span>
              </div>
              <br />
              <div>
                <span>Title</span> <br />
                <span>{dataProcess?.metadata?.title}</span>
              </div>
            </div>
          </div>

          <div className="d-flex flex-row justify-content-between">
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
            allData={data && data.result.data}
            setAllData={setAllData}
            setEle={setEle}
          />
        </section>
      </div>
    </>
  );
}
