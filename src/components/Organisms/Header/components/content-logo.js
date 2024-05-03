import { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";

export default function LogoAcessmonitor() {
  const { theme } = useContext(ThemeContext);

  const logoURL = theme === "light" ? "/img/logo.svg" : "/img/logo-dark.svg";
  return (
    <>
      <img src={logoURL} alt="accessMonitor" lang="en" />
    </>
  );
}
