import { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import { useTranslation } from "react-i18next";

import { Icon } from "../../../index";
import { useLocation } from "react-router-dom";

export function WidgetBar({ description, logo }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const themeClass = theme === "light" ? "" : "dark_mode";

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
    <div id="widget">
      <div className={`${themeClass} widgets-bar`}>
        <div className="container">
          <div className="row ml-0 mr-0">
            <div className="col-12 col-lg-6 align-self-center">
              <div className="d-flex justify-content-between">
                {location.pathname === "/amp" ? (
                  <>
                    <h1>{logo}</h1>
                  </>
                ) : (
                  <>
                    <p className="logo">
                      <a
                        href="/amp"
                        title={t("HEADER.logo_title")}
                      >
                        {logo}
                      </a>
                    </p>
                  </>
                )}

                <div className="d-flex d-lg-none flex-column align-items-center"></div>
              </div>
            </div>

            {/* Menu */}

            <div className="d-flex flex-row gap-4 button-mobile">
              <button
                className="btn btn-link dark-mode p-1 d-flex align-items-center"
                onClick={toggleTheme}
              >
                <span id="darkModeLabel-mobile">
                  {theme === "light"
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
                onClick={toggleLanguage}
              >
                <span id="langModeLabel-mobile">{t("HEADER.language_en")}</span>
                <Icon name="AMA-Globo-Line icon-lang" aria-hidden="true" />
              </button>
            </div>

            <div className="col-12 col-lg-6 align-self-center ">
              <div className="site-description">
                <p>{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
