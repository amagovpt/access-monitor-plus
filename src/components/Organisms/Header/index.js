import { useTranslation } from "react-i18next"

import LogoAcessmonitor from "./components/content-logo";

import { TopBar } from "./components/top-bar";
import { WidgetBar } from "./components/widgets-bar";

import "./styles/styles.css";

export function Header() {
  const {t} = useTranslation()
  return (
    <header id="wrapper-navbar">
      <div className="skip-to-content">
        <div className="container">
          <a className="skip-to-content-link" href="#content">
            <span>{t("MISC.skip_to_main")}</span>
          </a>
        </div>
      </div>

      <TopBar />

      <WidgetBar
        logo={<LogoAcessmonitor />}
        description={t("HEADER.line_text")}
      />
    </header>
  );
}
