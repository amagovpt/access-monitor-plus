import "./top-bar.css";

import { Icon, Link } from "../../../index";
import { useState } from "react";

export function TopBar() {
  const [ecossistemaAberto, setEcossistemaAberto] = useState(false);

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
                // aria-expanded="false"
                aria-controls="flushEcossistema"
                onClick={() => setEcossistemaAberto(!ecossistemaAberto)}
                aria-expanded={ecossistemaAberto ? "true" : "false"}
              >
                <span
                  className="icon-AMA-MenuCimaGrande-Line icon-ed-menu-dots"
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
              // id="flushEcossistema"
              // className="accordion-collapse collapse"
              // aria-labelledby="flushHeading"
              data-bs-parent="#accordionTopBar"
              id="flushEcossistema"
              className={`accordion-collapse collapse ${ecossistemaAberto ? "show" : ""}`}
              aria-labelledby="flushHeading"
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
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://observatorio.acessibilidade.gov.pt/"
                              text="Observatório Português da Acessibilidade Web"
                            />
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://www.acessibilidade.gov.pt/gerador/"
                              text={`Gerador "Declaração de Acessibilidade"`}
                            />
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://accessmonitor.acessibilidade.gov.pt/"
                              text="AccessMonitor"
                            />
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://www.acessibilidade.gov.pt/wcag/"
                            >
                              <abbr
                                title="Web Content Accessibility Guidelines, version 2.1"
                                lang="en"
                              >
                                WCAG 2.1
                              </abbr>
                            </Link>
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
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://mosaico.gov.pt/areas-tecnicas/usabilidade"
                              text="Usabilidade no Mosaico"
                            />
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://zeroheight.com/1be481dc2/p/97181d-agora-design-system"
                            >
                              Ágora <em lang="en">Design System</em> -
                              documentação
                            </Link>
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://prd-agora.northeurope.cloudapp.azure.com"
                            >
                              Ágora <em lang="en">Design System</em> -
                              componentes
                            </Link>
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://guias.mosaico.gov.pt/guias-praticos/usabilidade-como-realizar-testes-de-usabilidade"
                              text="Como realizar testes de usabilidade?"
                            />
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://guias.mosaico.gov.pt/guias-praticos/usabilidade-como-desenvolver-aplicacoes-para-dispositivos-moveis"
                              text="Como desenvolver aplicações móveis?"
                            />
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
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://pprselo.usabilidade.gov.pt/candidatura/"
                              text="Candidatura ao Selo"
                            />
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://pprselo.usabilidade.gov.pt/requisitos/"
                              text="Requisitos do Selo"
                            />
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://amagovpt.github.io/kit-selo/"
                              text="Kit informativo do Selo"
                            />
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://pprselo.usabilidade.gov.pt/ajuda/"
                              text="Dúvidas sobre o Selo?"
                            />
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
