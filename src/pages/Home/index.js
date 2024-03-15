import { Header, Breadcrumb, Footer, Tabs } from "../../components/index";
import { dynamicTabs } from "../../utils/dynamicTabs";

import "./styles.css";

export default function Home() {
  const dataBreadCrumb = [
    {
      title: "Acessibilidade.gov.pt",
      href: "/",
    },
    {
      title: "Access Monitor",
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

          <section className="bg-white validator_container">
            <aside>
              <p className="validator_container_description">
                Acesse nosso avaliador de práticas de acessibilidade na web
                (WCAG 2.1) aqui. Obtenha um relatório de acessibilidade usando
                um dos seguintes métodos:
              </p>

              <Tabs
                tabs={dynamicTabs}
                defaultActiveKey="tab1"
                vertical={false}
              />
            </aside>

            <aside>
              <img src="/img/verify.svg" alt="" className="verify_img" />
            </aside>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
