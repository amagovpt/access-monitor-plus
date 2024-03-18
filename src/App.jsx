import { BrowserRouter } from "react-router-dom";
import "./styles/theme.css";
import { RoutesConfig } from "./routes";

export default function App() {
  return (
    <BrowserRouter basename="/">
      <RoutesConfig />
    </BrowserRouter>
  );
}
