import {
  Header,
  Breadcrumb,
  Footer,
  TableAlternative,
  TableComponent,
} from "../../components/index";
import { ButtonsActions } from "./_components/buttons-revalidation";
import "./styles.css";

import GaugeChart from "react-gauge-chart";

export default function Resume() {
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
      title: "https://lbc-global.com/",
      href: "#",
    },
  ];

  return (
    <>
      <Header />

      <main className="main">
        <div className="container">
          <div className="link_breadcrumb_container">
            <Breadcrumb data={dataBreadCrumb} />
          </div>

          <div className="report_container">
            <div className="acess_monitor">AcessMonitor</div>

            <h1 className="report_container_title">https://lbc-global.com/</h1>

            <p className="report_container_subtitle">
              Relatório de práticas de acessibilidade Web (WCAG 2.1 do W3C)
            </p>

            <ButtonsActions />
          </div>

          <section className="sumary_container bg-white">
            <h2>Sumário</h2>

            <div className="d-flex flex-row mt-5 mb-5">
              <div className="chart_container">
                <GaugeChart
                  id="gauge-chart3"
                  nrOfLevels={3}
                  colors={["red", "orange", "green"]}
                  arcWidth={0.1}
                  percent={0.9}
                  textColor={"black"}
                />
              </div>

              <div className="resume_info_about_uri">
                <div>
                  <span>URI</span> <br />
                  <span>https://lbc-global.com/</span>
                </div>
                <br />
                <div>
                  <span>Title</span> <br />
                  <span>LBC Innovative Transformation</span>
                </div>
              </div>
            </div>

            <div className="d-flex flex-row">
              <div className="size_container">
                <div>
                  <span>815</span> <br />
                  <span>(x)HTML elements</span>
                </div>
                <br />
                <div>
                  <span>105 KB</span> <br />
                  <span>Page size</span>
                </div>
              </div>

              <div className="table_container_sumary">
                <TableAlternative />
              </div>
            </div>
          </section>

          <section className="bg-white avaliation_container">
            <h2 className="avaliation_title">Avaliação</h2>
            <TableComponent />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
