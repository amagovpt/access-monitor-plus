import "./styles.css";
import { useTranslation } from "react-i18next";

export function LoadingComponent() {
  const { t } = useTranslation();
  return (
    <div className="loadingContainer">
      <span>{t("MISC.loading")}</span>

      <div className="loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
}
