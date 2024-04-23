import { Icon } from "../../Atoms/Icon";
import "./styles.css";
import { useTranslation } from "react-i18next"

export function Footer() {
  const {t} = useTranslation()
  return (
    <footer>
      <div>
        <a
          href="#wrapper-navbar"
          className="back-to-top"
          id="back-to-topo-button"
        >
          <span className="visually-hidden">Voltar ao Topo</span>

          <Icon name="AMA-SetadoisoficialCima-Line" />
        </a>
      </div>

      <div className="d-block">
        <div className="row no-gutters">
          <div className="col-sm-12 col-8">
            <nav aria-label={t("FOOTER.main_aria_label")}>
              <ul className="d-sm-flex d-block justify-content-center p-3">
                <li className="d-flex links">
                  <a href="/acessibilidade">{t("FOOTER.accessibility")}</a>
                </li>
                <li className="d-flex links">
                  <a href="/termos-e-condicoes/">{t("FOOTER.terms")}</a>
                </li>
                <li className="d-flex links">
                  <a
                    target="_blank"
                    href="https://www.ama.gov.pt/web/agencia-para-a-modernizacao-administrativa/politica-de-privacidade"
                    rel="noopener noreferrer"
                  >
                    {t("FOOTER.privacy")}
                  </a>
                </li>
                <li className="d-flex links">
                  <a
                    target="_blank"
                    href="https://amagovpt.github.io/kit-selo/"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
                <li className="d-flex links">
                  <a
                    target="_blank"
                    href="/glossario/"
                    rel="noopener noreferrer"
                  >
                    {t("FOOTER.glossary")}
                  </a>
                </li>
                <li className="d-flex links">
                  <a href="/opcoes-de-visualizacao/">{t("FOOTER.options")}</a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="col-4 d-flex justify-content-end d-sm-none">
            <div>
              <a
                className="position-relative"
                href="https://selo.acessibilidade.gov.pt/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">{t("HEADER.DROPDOWN.external_link")}</span>
                <img
                  src="/img/selo_ouro_small.png"
                  alt={t("FOOTER.gold_badge_label")}
                />
              </a>
            </div>
          </div>
          <div className="col-sm-12 d-flex justify-content-center">
            <nav
              className="d-inline-flex"
              aria-label={t("FOOTER.owner_and_co_financers_aria_label")}
            >
              <ul className="d-sm-flex justify-content-center d-block">
                <li className="d-inline-flex justify-content-center">
                  <img
                    id="republica_portuguesa"
                    src="/img/republica_portuguesa.png"
                    alt={t("FOOTER.img_portuguese_replubic")}
                  />
                </li>
                <li className="d-inline-flex justify-content-center">
                  <img
                    id="ama_img"
                    src="/img/ama-modernizacao_administrativa.png"
                    alt={t("FOOTER.img_ama")}
                  />
                </li>
                <li className="d-inline-flex justify-content-center">
                  <img
                    id="compete_2020"
                    src="/img/compete_2020.png"
                    alt={t("FOOTER.img_compete_2020")}
                  />
                </li>
                <li className="d-inline-flex justify-content-center">
                  <img
                    id="uniao_europeia"
                    src="/img/UE-uniao_europeia.png"
                    alt={t("FOOTER.img_european_union")}
                  />
                </li>
                <li className="d-inline-flex justify-content-center">
                  <img
                    id="portugal_2020"
                    src="/img/portugal_2020.png"
                    alt="Portugal 2020"
                  />
                </li>
              </ul>
            </nav>
            <div className="d-sm-flex d-none selo_large">
              <a
                className="position-relative"
                href="https://selo.acessibilidade.gov.pt/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">{t("HEADER.DROPDOWN.external_link")}</span>
                <img
                  src="/img/selo.png"
                  alt={t("FOOTER.gold_badge_label")}
                />
              </a>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center p-3 copyright">
          © <script>document.write(new Date().getFullYear())</script>2024 AMA{" "}
          <span className="d-none d-sm-inline">-</span>{" "}
          <br className="d-block d-sm-none" />
          {t("FOOTER.link") + " " + t("FOOTER.rights")}
        </div>
      </div>
    </footer>
  );
}
