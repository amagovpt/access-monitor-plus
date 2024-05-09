import "./top-bar.css";

import { Icon, Link } from "../../../index";
import { useContext, useRef, useState } from "react";

import { ThemeContext } from "../../../../context/ThemeContext";

import { useTranslation } from "react-i18next";

export function TopBar() {
  const [openAccordion, setOpenAccordion] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const accordionContentRef = useRef(null);

  const themeClass = theme === "light" ? "" : "dark_mode";

  const toggleAccordion = () => {
    setOpenAccordion(!openAccordion);
    if (!openAccordion && accordionContentRef.current) {
      accordionContentRef.current.focus();
    }
  };

  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const toggleLanguage = () => {
    if (language === "en") {
      changeLanguage("pt");
      document.querySelector("html")?.setAttribute("lang", "pt-PT");
    } else {
      changeLanguage("en");
      document.querySelector("html")?.setAttribute("lang", "en");
    }
  };

  return (
    <>
      <div className={`top-bar ${themeClass}`}>
        <div className="accordion accordion-flush" id="accordionTopBar">
          <div className="container">
            <div className="d-flex justify-content-between flex-row-reverse">
              <div className="d-flex flex-row gap-4">
                <button
                  className="btn btn-link dark-mode p-1 d-flex align-items-center"
                  id="darkModeBtn"
                  onClick={toggleTheme}
                >
                  <span id="darkModeLabel">
                    {theme !== "light"
                      ? t("HEADER.light_mode")
                      : t("HEADER.dark_mode")}
                  </span>
                  <Icon
                    name="AMA-EscuroClaro-Line icon-dark"
                    aria-hidden="true"
                  />
                </button>

                <button
                  className="btn btn-link language-mode p-1  d-flex align-items-center"
                  id="langModeBtn"
                  onClick={toggleLanguage}
                  lang={language === "en" ? "pt-PT" : "en"}
                >
                  <span
                    id="langModeLabel"
                  >
                    {t("HEADER.language_en")}
                  </span>
                  <Icon name="AMA-Globo-Line icon-lang" aria-hidden="true" />
                </button>
              </div>

              <button
                type="button"
                className="btn btn-link btn-ecossistema collapsed d-flex align-items-center p-1"
                data-bs-toggle="collapse"
                data-bs-target="#flushEcossistema"
                aria-controls="flushEcossistema"
                onClick={toggleAccordion}
                aria-expanded={openAccordion ? "true" : "false"}
                id="accordionBtn"
              >
                <span
                  className="icon-AMA-MenuCimaGrande-Line icon-ed-menu-dots"
                  aria-hidden="true"
                />

                <span id="flushHeading">
                  {t("HEADER.tool") + " "}
                  <span className="text-primary fw-bold dark_mode_span">
                    acessibilidade.gov.pt
                  </span>
                </span>

                <span
                  className={` icon ${
                    openAccordion
                      ? "icon-AMA-SetaCima3-Line"
                      : "icon-AMA-SetaBaixo3-Line "
                  }`}
                  aria-hidden="true"
                ></span>
              </button>
            </div>
            <div
              data-bs-parent="#accordionTopBar"
              id="flushEcossistema"
              className={`accordion-collapse collapse ${openAccordion ? "show" : ""}`}
              aria-labelledby="flushHeading"
            >
              <div className="accordion-body ps-0 pe-0">
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-lg-6 align-self-center">
                      <div className="d-flex justify-content-between">
                        <div className="title-ecosssistema-ama">
                          <div className="h2">
                            {t("HEADER.DROPDOWN.ecosystem")}
                            <br />
                            <strong>acessibilidade</strong>.gov.pt
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 align-self-center">
                      <div className="description-ecossistema-ama">
                        <p>{t("HEADER.DROPDOWN.text")}</p>
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
                        <p>{t("HEADER.DROPDOWN.accessibility.text")}</p>
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
                              text={t("HEADER.DROPDOWN.accessibility.link1")}
                            />
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://www.acessibilidade.gov.pt/gerador/"
                              text={t("HEADER.DROPDOWN.accessibility.link2")}
                            />
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://accessmonitor.acessibilidade.gov.pt/"
                              text={t("HEADER.DROPDOWN.accessibility.link3")}
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
                        <p>{t("HEADER.DROPDOWN.usability.text")}</p>
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
                              text={t("HEADER.DROPDOWN.usability.link1")}
                            />
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://zeroheight.com/1be481dc2/p/97181d-agora-design-system"
                              text={t("HEADER.DROPDOWN.usability.link2")}
                            />
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://prd-agora.northeurope.cloudapp.azure.com"
                              text={t("HEADER.DROPDOWN.usability.link3")}
                            />
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://guias.mosaico.gov.pt/guias-praticos/usabilidade-como-realizar-testes-de-usabilidade"
                              text={t("HEADER.DROPDOWN.usability.link5")}
                            />
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://guias.mosaico.gov.pt/guias-praticos/usabilidade-como-desenvolver-aplicacoes-para-dispositivos-moveis"
                              text={t("HEADER.DROPDOWN.usability.link6")}
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
                        <p>{t("HEADER.DROPDOWN.badge.text")}</p>
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
                              text={t("HEADER.DROPDOWN.badge.link3")}
                            />
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://pprselo.usabilidade.gov.pt/requisitos/"
                              text={t("HEADER.DROPDOWN.badge.link5")}
                            />
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://amagovpt.github.io/kit-selo/"
                              text={t("HEADER.DROPDOWN.badge.link2")}
                            />
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://pprselo.usabilidade.gov.pt/ajuda/"
                              text={t("HEADER.DROPDOWN.badge.link1")}
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
