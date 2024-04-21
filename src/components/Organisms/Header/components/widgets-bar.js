import { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";

export function WidgetBar({ description, logo }) {
  const { theme } = useContext(ThemeContext);

  const themeClass = theme === "light" ? "" : "dark_mode";
  return (
    <div id="widget">
      <div className={`${themeClass} widgets-bar`}>
        <div className="container">
          <div className="row ml-0 mr-0">
            <div className="col-12 col-lg-6 align-self-center">
              <div className="d-flex justify-content-between">
                <h1 className="logo">{logo}</h1>

                <div className="d-flex d-lg-none flex-column align-items-center">
                  <button
                    type="button"
                    className="open-mobile-menu menu-hamburger rounded-circle"
                  >
                    <span
                      className="icon-AMA-Menu-Line"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">
                      Abrir menu de navegação
                    </span>
                  </button>
                </div>
              </div>
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
