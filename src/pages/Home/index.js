import { InsertHtmlUpload } from "./_components/insert-upload-html";
import { InsertUrl } from "./_components/insert-url";
import { InsertHtml } from "./_components/insert-html";
import "./styles.css";

import { Breadcrumb, Tabs } from "../../components/index";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function Home({ changeState }) {
  const tabs = [
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

  const breadcrumbs = [
    {
      title: "Acessibilidade.gov.pt",
      href: "/",
    },
    {
      title: "Access Monitor",
      href: "/",
    },
  ];

  const { theme } = useContext(ThemeContext);
  const main_content_home = theme === "light" ? "" : "main_content_home";
  const imgUrl = theme === "light" ? "/img/verify.svg" : "/img/verify-dark.svg";

  return (
    <>
      <div className="container">
        <div className="link_breadcrumb_container">
          <Breadcrumb data={breadcrumbs} />
        </div>

        <section
          className={`bg-white validator_container ${main_content_home}`}
        >
          <div className="d-flex flex-column align-items-stretch left_container">
            <p className="validator_container_description">
              Aceda aqui ao nosso validador de práticas de acessibilidade Web
              (WCAG 2.1). Obtenha um relatório de acessibilidade através de um
              dos seguintes métodos:
            </p>

            <Tabs tabs={tabs} defaultActiveKey="tab1" vertical={false} />
          </div>

          <div className="d-flex flex-row align-items-start right_container">
            <img
              src={imgUrl}
              // src="/img/verify.svg"
              alt="imagem de verificação"
              className="verify_img"
            />
          </div>
        </section>
      </div>
    </>
  );
}
