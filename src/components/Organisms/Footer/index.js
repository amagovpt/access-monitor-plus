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
                <a href="https://selo.leadershipbt.com/selo/">
                  {t("FOOTER.accessibility")}
                </a>
              </li>

              <li
                id="menu-item-194"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-193"
              >
                <a href="https://selo.leadershipbt.com/selo/">
                  {t("FOOTER.terms")}
                </a>
              </li>

              <li
                id="menu-item-190"
                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-190"
              >
                <a href="https://www.ama.gov.pt/web/agencia-para-a-modernizacao-administrativa/politica-de-privacidade">
                  {t("FOOTER.privacy")}
                </a>
              </li>

              <li
                id="menu-item-191"
                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-191"
              >
                <a href="https://amagovpt.github.io/kit-selo/">Github</a>
              </li>

              <li
                id="menu-item-192"
                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-192"
              >
                <a href="/acessibilidade">{t("FOOTER.glossary")}</a>
              </li>
              <li
                id="menu-item-68"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-68"
              >
                <a href="https://selo.leadershipbt.com/contactos/">
                  {t("FOOTER.options")}
                </a>
              </li>
            </ul>
          </div>{" "}
        </nav>
        <div className="footer-logos">
          <div className="footer-logo">
            <div className="lazyblock-imagem-ama-2rOgz0 wp-block-lazyblock-imagem-ama">
              <img
                decoding="async"
                alt={t("FOOTER.img_portuguese_replubic")}
                src="https://selo.leadershipbt.com/wp-content/uploads/2023/02/logo_republica_portuguesa.svg"
                className="img-fluid"
                width="150"
              />
            </div>
          </div>
          <div className="footer-logo">
            <div className="lazyblock-imagem-ama-Z2oMmri wp-block-lazyblock-imagem-ama">
              <img
                decoding="async"
                alt={t("FOOTER.img_ama")}
                src="https://selo.leadershipbt.com/wp-content/uploads/2023/02/logo_ama.svg"
                className="img-fluid"
                width="150"
              />
            </div>
          </div>
          <div className="footer-logo">
            <div className="lazyblock-imagem-ama-jmjHR wp-block-lazyblock-imagem-ama">
              <img
                decoding="async"
                alt="eportugal"
                src="https://selo.leadershipbt.com/wp-content/uploads/2023/02/logo_eportugal.svg"
                className="img-fluid"
                width="150"
              />
            </div>
          </div>
          <div className="footer-logo">
            <div className="lazyblock-imagem-ama-25Hrrx wp-block-lazyblock-imagem-ama">
              <img
                decoding="async"
                alt={t("FOOTER.img_ama")}
                src="https://selo.leadershipbt.com/wp-content/uploads/2023/02/logo_usabilidade.svg"
                className="img-fluid"
                width="150"
              />
            </div>
          </div>
          <div className="footer-logo">
            <div className="lazyblock-imagem-ama-1DuQY7 wp-block-lazyblock-imagem-ama">
              <img
                decoding="async"
                alt={t("FOOTER.img_compete_2020")}
                src="https://selo.leadershipbt.com/wp-content/uploads/2023/02/logo_compete.svg"
                className="img-fluid"
                width="150"
              />
            </div>
          </div>
          <div className="footer-logo">
            <div className="lazyblock-imagem-ama-1r3njs wp-block-lazyblock-imagem-ama">
              <img
                decoding="async"
                alt="Portugal 2020"
                src="https://selo.leadershipbt.com/wp-content/uploads/2023/02/logo_2020.svg"
                className="img-fluid"
                width="150"
              />
            </div>
          </div>
          <div className="footer-logo">
            <div className="lazyblock-imagem-ama-Z13rhsj wp-block-lazyblock-imagem-ama">
              <img
                decoding="async"
                alt={t("FOOTER.img_european_union")}
                src="https://selo.leadershipbt.com/wp-content/uploads/2023/02/logo_uniao_europeia.svg"
                className="img-fluid"
                width="150"
              />
            </div>
          </div>
        </div>
        <div className="logo-selo">
          <img
            src="https://selo.leadershipbt.com/wp-content/themes/www-a11y-theme/img/selo-ouro.svg"
            alt="Selo Ouro de Usabilidade e Acesisbilidade"
          />
        </div>
        <div className="copyright">
          <p>
            © 2024 AMA - Agência para a Modernização Administrativa, I. P.
            Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
