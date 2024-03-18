import "./top-bar.css";

import { Icon } from "../../../index";

export function TopBar() {
  return (
    <>
      <div className="top-bar">
        <div className="accordion accordion-flush" id="accordionTopBar">
          <div className="container">
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-link btn-ecossistema collapsed d-flex align-items-center p-1"
                data-bs-toggle="collapse"
                data-bs-target="#flushEcossistema"
                aria-expanded="false"
                aria-controls="flushEcossistema"
              >
                <span
                  className="icon-AMA-MenuCima-Line icon-ed-menu-dots"
                  aria-hidden="true"
                />

                <span id="flushHeading">
                  Uma ferramenta do ecossistema{" "}
                  <span className="text-primary fw-bold">
                    acessibilidade.gov.pt
                  </span>
                </span>
                <span
                  className="icon-AMA-SetaBaixo3-Line icon"
                  aria-hidden="true"
                ></span>
              </button>
              <button
                className="btn btn-link dark-mode p-1 d-flex align-items-center"
                id="darkModeBtn"
              >
                <span id="darkModeLabel">Modo Escuro</span>
                <Icon
                  name="AMA-EscuroClaro-Line icon-dark"
                  aria-hidden="true"
                />
              </button>
            </div>
            <div
              id="flushEcossistema"
              className="accordion-collapse collapse"
              aria-labelledby="flushHeading"
              data-bs-parent="#accordionTopBar"
            >
              <div className="accordion-body ps-0 pe-0">
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-lg-6 align-self-center">
                      <div className="d-flex justify-content-between">
                        <div className="title-ecosssistema-ama">
                          <div className="h2">
                            ecossistema
                            <br />
                            <strong>acessibilidade</strong>.gov.pt
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 align-self-center">
                      <div className="description-ecossistema-ama">
                        <p>
                          Os sítios e as ferramentas de apoio à acessibilidade e
                          à usabilidade, para garantir a promoção das boas
                          práticas e melhorar a experiência de utilização dos
                          serviços públicos digitais.
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr className="mt-4 mb-5" />
                  <div className="row">
                    <div className="col-12 col-lg-4">
                      <div className="left-column-ecossistema-ama">
                        <div className="h3">
                          <strong>acessibilidade</strong>.gov.pt
                        </div>
                      </div>
                      <div className="left-column-ecossistema-ama">
                        <p>
                          Divulgação, partilha e promoção das melhores práticas
                          de acessibilidade para conteúdos Web e aplicações
                          móveis.
                        </p>
                      </div>
                      <div className="left-column-ecossistema-ama">
                        <div
                          style={{ height: "20px" }}
                          aria-hidden="true"
                          className="wp-block-spacer"
                        ></div>
                      </div>
                      <div className="left-column-ecossistema-ama">
                        <ul className="ama-list">
                          <li>
                            <a href="https://observatorio.acessibilidade.gov.pt/">
                              Observatório Português da Acessibilidade Web
                            </a>
                          </li>

                          <li>
                            <a href="https://www.acessibilidade.gov.pt/gerador/">
                              Gerador "Declaração de Acessibilidade"
                            </a>
                          </li>

                          <li>
                            <a href="https://accessmonitor.acessibilidade.gov.pt/">
                              AccessMonitor
                            </a>
                          </li>

                          <li>
                            <a href="https://www.acessibilidade.gov.pt/wcag/">
                              <abbr
                                title="Web Content Accessibility Guidelines, version 2.1"
                                lang="en"
                              >
                                WCAG 2.1
                              </abbr>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-12 col-lg-4">
                      <div className="center-column-ecossistema-ama">
                        <div className="h3">
                          <strong>mosaico</strong>.gov.pt
                        </div>
                      </div>
                      <div className="center-column-ecossistema-ama">
                        <p>
                          Recursos, ferramentas e boas práticas para melhorar a
                          experiência de utilização dos serviços públicos
                          digitais.
                        </p>
                      </div>
                      <div className="center-column-ecossistema-ama">
                        <div
                          style={{ height: "20px" }}
                          aria-hidden="true"
                          className="wp-block-spacer"
                        ></div>
                      </div>
                      <div className="center-column-ecossistema-ama">
                        <ul className="ama-list">
                          <li>
                            <a href="https://mosaico.gov.pt/areas-tecnicas/usabilidade">
                              Usabilidade no Mosaico
                            </a>
                          </li>

                          <li>
                            <a href="https://zeroheight.com/1be481dc2/p/97181d-agora-design-system">
                              Ágora <em lang="en">Design System</em> -
                              documentação
                            </a>
                          </li>

                          <li>
                            <a href="https://prd-agora.northeurope.cloudapp.azure.com">
                              Ágora <em lang="en">Design System</em> -
                              componentes
                            </a>
                          </li>

                          <li>
                            <a href="https://guias.mosaico.gov.pt/guias-praticos/usabilidade-como-realizar-testes-de-usabilidade">
                              Como realizar testes de usabilidade?
                            </a>
                          </li>

                          <li>
                            <a href="https://guias.mosaico.gov.pt/guias-praticos/usabilidade-como-desenvolver-aplicacoes-para-dispositivos-moveis">
                              Como desenvolver aplicações móveis?
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-12 col-lg-4">
                      <div className="right-column-ecossistema-ama">
                        <div className="h3">
                          <strong>selo.usabilidade</strong>.gov.pt
                        </div>
                      </div>
                      <div className="right-column-ecossistema-ama">
                        <p>
                          Selo de excelência que premeia as boas práticas de
                          acessibilidade e usabilidade nos sítios Web dos
                          serviços públicos digitais.
                        </p>
                      </div>
                      <div className="right-column-ecossistema-ama">
                        <div
                          style={{ height: "20px" }}
                          aria-hidden="true"
                          className="wp-block-spacer"
                        ></div>
                      </div>
                      <div className="right-column-ecossistema-ama">
                        <ul className="ama-list">
                          <li>
                            <a href="https://pprselo.usabilidade.gov.pt/candidatura/">
                              Candidatura ao Selo
                            </a>
                          </li>

                          <li>
                            <a href="https://pprselo.usabilidade.gov.pt/requisitos/">
                              Requisitos do Selo
                            </a>
                          </li>

                          <li>
                            <a href="https://amagovpt.github.io/kit-selo/">
                              Kit informativo do Selo
                            </a>
                          </li>

                          <li>
                            <a href="https://pprselo.usabilidade.gov.pt/ajuda/">
                              Dúvidas sobre o Selo?
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
