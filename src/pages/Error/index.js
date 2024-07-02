import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../context/ThemeContext";
import { Icon } from "../../components";
import "./styles.css";

export default function Resume() {
  const { t } = useTranslation();

  const { theme } = useContext(ThemeContext);
  const themeClass = theme === "light" ? "" : "dark_mode-error";

  return (
    <div className={`container_error ${themeClass}`}>
      <h1>{t("MISC._404.title")}</h1>
      <p>{t("MISC._404.description")}</p>
      <a href="/amp">
        <span>{t("MISC._404.homepage")}</span>
        <Icon name="AMA-Entrar-Line" />
      </a>
    </div>
  );
}
