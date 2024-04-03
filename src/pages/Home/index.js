import { InsertHtmlUpload } from "./_components/insert-upload-html";
import { InsertUrl } from "./_components/insert-url";
import { InsertHtml } from "./_components/insert-html";
import "./styles.css";

import { Breadcrumb, Tabs } from "../../components/index";

export default function Home({ changeState }) {
  const dynamicTabs = [
    {
      eventKey: "tab1",
      title: "Insert URL",
      component: <InsertUrl changeState={changeState} />,
    },
    {
      eventKey: "tab2",
      title: "Insert HTML code",
      component: <InsertHtml />,
    },
    {
      eventKey: "tab3",
      title: "Upload HTML file",
      component: <InsertHtmlUpload />,
    },
  ];

  const dataBreadCrumb = [
    {
      title: "Acessibilidade.gov.pt",
      href: "/",
    },
    {
      title: "Access Monitor",
      href: "/",
    },
  ];

  return (
    <>
      <div className="container">
        <div className="link_breadcrumb_container">
          <Breadcrumb data={dataBreadCrumb} />
        </div>

        <section className="bg-white validator_container">
          <div className="first_container">
            <p className="validator_container_description">
              Acesse nosso avaliador de práticas de acessibilidade na web (WCAG
              2.1) aqui. Obtenha um relatório de acessibilidade usando um dos
              seguintes métodos:
            </p>

            <Tabs tabs={dynamicTabs} defaultActiveKey="tab1" vertical={false} />
          </div>

          <div className="last_container">
            <img src="/img/verify.svg" alt="" className="verify_img" />
          </div>
        </section>
      </div>
    </>
  );
}
