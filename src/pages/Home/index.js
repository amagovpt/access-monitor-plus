import { InsertHtmlUpload } from "./_components/insert-upload-html";
import { InsertUrl } from "./_components/insert-url";
import { InsertHtml } from "./_components/insert-html";
import "./styles.css";

import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Breadcrumb, Tabs } from "ama-design-system";

import { useTranslation } from "react-i18next";

import { pathURL } from "../../App";

export default function Home({ changeState }) {
  const { t } = useTranslation();

  const tabs = [
    {
      eventKey: "tab1",
      title: t("HEADER.dialog.insert_url"),
      component: <InsertUrl changeState={changeState} />,
    },
    {
      eventKey: "tab2",
      title: t("HEADER.dialog.insert_html"),
      component: <InsertHtml />,
    },
    {
      eventKey: "tab3",
      title: t("HEADER.dialog.upload_html"),
      component: <InsertHtmlUpload />,
    },
  ];

  const breadcrumbs = [
    {
      title: "Acessibilidade.gov.pt",
      href: "https://www.acessibilidade.gov.pt/",
    },
    { title: "Access Monitor", href: `${pathURL}` },
  ];

  const { theme } = useContext(ThemeContext);
  const main_content_home = theme === "light" ? "" : "main_content_home";
  const imgUrl =
    theme === "light" ? `${pathURL}img/verify.svg` : `${pathURL}img/verify-dark.svg`;

  return (
    <>
      <div className="container">
        <div className="link_breadcrumb_container">
          <Breadcrumb data={breadcrumbs} darkTheme={theme} tagHere={t("HEADER.DROPDOWN.youarehere")} />
        </div>

        <section
          className={`bg-white validator_container ${main_content_home}`}
        >
          <div className="d-flex flex-column align-items-stretch left_container">
            <div className="d-flex flex-column mb-4">
              <p className="validator_container_description">
                {t("HOME_PAGE.intro_text")}
              </p>

              <p className="validator_container_description">
                {t("HOME_PAGE.intro_text_content")}
              </p>
            </div>

            <Tabs tabs={tabs} defaultActiveKey="tab1" vertical={false} />
          </div>

          <div className="d-flex flex-row align-items-start right_container">
            <img src={imgUrl} className="verify_img" alt="" />
          </div>
        </section>
      </div>
    </>
  );
}
