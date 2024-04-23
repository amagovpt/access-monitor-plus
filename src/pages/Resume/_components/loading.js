import "./styles.css";
import { useTranslation } from "react-i18next"


export function LoadingComponent() {
  const {t} = useTranslation()
  return (
    <div className="loadingContainer">
      <span>{t("MISC.loading")}</span>

      <div class="loader">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
  );
}
