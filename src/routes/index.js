import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Resume from "../pages/Resume";
import Details from "../pages/Details";
import PageCode from "../pages/PageCode";
import Error from "../pages/Error";

export function RoutesConfig() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/resumo" element={<Resume />} />
      <Route path="/resumo/code" element={<PageCode />} />
      <Route path="/detalhe" element={<Details />} />
      {/* <Route path="*" element={<NotFound />} /> */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
