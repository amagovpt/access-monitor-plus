import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Resume from "../pages/Resume";
import Details from "../pages/Details";

export function RoutesConfig() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/resumo" element={<Resume />} />
      <Route path="/detalhe" element={<Details />} />

      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}
