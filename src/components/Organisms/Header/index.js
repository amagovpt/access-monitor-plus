import LogoAcessmonitor from "./components/content-logo";

import { TopBar } from "./components/top-bar";
import { WidgetBar } from "./components/widgets-bar";

import "./styles/styles.css";

export function Header() {
  return (
    <header id="wrapper-navbar">
      <div className="skip-to-content">
        <div className="container">
          <a className="skip-to-content-link" href="#content">
            <span>Saltar para o conteúdo principal da página</span>
          </a>
        </div>
      </div>

      <TopBar />

      <WidgetBar
        logo={<LogoAcessmonitor />}
        description="The web accessibility practices evaluator (WCAG 2.1)"
      />
    </header>
  );
}
