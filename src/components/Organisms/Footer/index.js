import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import "./styles.css";

import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const themeClass = theme === "light" ? "" : "dark_mode_footer";

  return (
    <footer className={`${themeClass}`}>
      <div className="container">
        <nav aria-label="Menu de rodapé do selo.usabilidade.gov.pt">
          <div className="menu-menu-de-rodape-container">
            <ul id="menu-menu-de-rodape" className="footer-menu">
              <li
                id="menu-item-193"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-193"
              >
                <a
                  href="https://www.acessibilidade.gov.pt/acessibilidade/"
                  rel="noreferrer"
                >
                  {t("FOOTER.accessibility")}
                </a>
              </li>

              <li
                id="menu-item-194"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-193"
              >
                <a
                  href="https://www.acessibilidade.gov.pt/termos-e-condicoes/"
                  rel="noreferrer"
                >
                  {t("FOOTER.terms")}
                </a>
              </li>

              <li
                id="menu-item-190"
                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-190"
              >
                <a
                  href="https://www.ama.gov.pt/web/agencia-para-a-modernizacao-administrativa/politica-de-privacidade"
                  rel="noreferrer"
                >
                  {t("FOOTER.privacy")}
                </a>
              </li>

              <li
                id="menu-item-191"
                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-191"
              >
                <a
                  href="https://amagovpt.github.io/kit-selo/"
                  rel="noreferrer"
                >
                  Github
                </a>
              </li>

              <li
                id="menu-item-192"
                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-192"
              >
                <a
                  href="https://www.acessibilidade.gov.pt/glossario/"
                  rel="noreferrer"
                >
                  {t("FOOTER.glossary")}
                </a>
              </li>
              <li
                id="menu-item-68"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-68"
              >
                <a
                  href="https://www.acessibilidade.gov.pt/opcoes-de-visualizacao/"
                  rel="noreferrer"
                >
                  {t("FOOTER.options")}
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <ul className="footer-logos">
          <li>
            <img
              decoding="async"
              alt={t("FOOTER.img_portuguese_replubic")}
              src="https://selo.leadershipbt.com/wp-content/uploads/2023/02/logo_republica_portuguesa.svg"
              className="img-fluid"
              width="150"
            />
          </li>

          <li>
            <img
              decoding="async"
              alt={t("FOOTER.img_ama")}
              src="https://selo.leadershipbt.com/wp-content/uploads/2023/02/logo_ama.svg"
              className="img-fluid"
              width="150"
            />
          </li>

          <li>
            <img
              decoding="async"
              alt="eportugal"
              src="https://selo.leadershipbt.com/wp-content/uploads/2023/02/logo_eportugal.svg"
              className="img-fluid"
              width="150"
            />
          </li>

          <li>
            <img
              decoding="async"
              alt="usabilidade.gov.pt"
              src="https://selo.leadershipbt.com/wp-content/uploads/2023/02/logo_usabilidade.svg"
              className="img-fluid"
              width="150"
            />
          </li>

          <li>
            <img
              decoding="async"
              alt={t("FOOTER.img_compete_2020")}
              src="https://selo.leadershipbt.com/wp-content/uploads/2023/02/logo_compete.svg"
              className="img-fluid"
              width="150"
            />
          </li>

          <li>
            <img
              decoding="async"
              alt="Portugal 2020"
              src="https://selo.leadershipbt.com/wp-content/uploads/2023/02/logo_2020.svg"
              className="img-fluid"
              width="150"
            />
          </li>

          <li>
            <img
              decoding="async"
              alt={t("FOOTER.img_european_union")}
              src="https://selo.leadershipbt.com/wp-content/uploads/2023/02/logo_uniao_europeia.svg"
              className="img-fluid"
              width="150"
            />
          </li>
        </ul>

        <div className="logo-selo">
          <img
            src="https://selo.leadershipbt.com/wp-content/themes/www-a11y-theme/img/selo-ouro.svg"
            alt={t("FOOTER.gold_badge_label")}
          />
        </div>
        <div className="copyright">
          <p>
            © 2024 AMA - {t("FOOTER.link")}
            {t("FOOTER.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
