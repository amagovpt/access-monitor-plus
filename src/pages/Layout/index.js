import { useContext } from "react";
import { Footer, Header } from "../../components";
import { ThemeContext } from "../../context/ThemeContext";
import "./styles.css";
import { useTranslation } from "react-i18next";

export default function Layout({ children }) {
  const { theme } = useContext(ThemeContext);
  const mainDark = theme === "light" ? "" : "main_dark";

  const { t } = useTranslation();

  return (
    <>
      <Header />
      <main
        className={`main ${mainDark}`}
        id="content"
        aria-label={t("HOME_PAGE.main_aria")}
      >
        {children}
      </main>

      <Footer />
    </>
  );
}
