import { useContext } from "react";
import { Footer, Header } from "../../components";
import { ThemeContext } from "../../context/ThemeContext";
import "./styles.css";

export default function Layout({ children }) {
  const { theme } = useContext(ThemeContext);
  const mainDark = theme === "light" ? "" : "main_dark";

  return (
    <>
      <Header />
      <main className={`main ${mainDark}`} id="content">
        {children}
      </main>

      <Footer />
    </>
  );
}
