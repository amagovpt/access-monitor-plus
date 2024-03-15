import { Breadcrumb, Footer, Header, Tabs } from "../../components";
import { detailsTabs } from "../../utils/dynamicTabs";

import "./styles.css";

export default function Details() {
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

            <p className="report_container_subtitle">Resultados do teste</p>
          </div>

          <div className="bg-white show_details">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <div className="d-flex flex-row align-items-center">
                <div className="image_container_warning">
                  <img
                    src="/img/icons/warning.svg"
                    alt=""
                    width="36px"
                    height="36px"
                  />
                </div>

                <span>
                  Headings (<span>h1</span> - <span>h6</span>)
                </span>
              </div>

              <div className="result_left_container">
                <span>9</span>
                <span>elements founds</span>
              </div>
            </div>
          </div>

          <Tabs tabs={detailsTabs} defaultActiveKey="tab1" vertical={false} />
        </div>
      </main>

      <Footer />
    </>
  );
}
