import {
  Breadcrumb,
} from "../../components/index";
import { ButtonsActions } from "./_components/buttons-revalidation";
import "./styles.css";
import { useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next"

export default function Resume() {
  const location = useLocation();
  const {t} = useTranslation()

  const dataProcess = location.state?.content || null;
  const code = location.state?.code || null

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
    {
      title: t("HEADER.NAV.code"),
    },
  ];

  return (
    <div className="container">
      <div className="link_breadcrumb_container">
        <Breadcrumb data={dataBreadCrumb} />
      </div>
      <div className="report_container">
        <div className="acess_monitor">AcessMonitor</div>
        <h1 className="report_container_title">{dataProcess?.metadata?.url || "html"}</h1>
        <p className="report_container_subtitle">
          {t("HEADER.NAV.code")}
        </p>
        <ButtonsActions htmlValue={dataProcess?.metadata?.url} />
      </div>
      <section className="html_code">
        <h2 className="code_text">
            {code || `<></>`}
        </h2>
      </section>
    </div>
  );
}
