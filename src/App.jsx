import "./styles/theme.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home/";
import "./i18n";
import Resume from "./pages/Resume";
import Detail from "./pages/Details";
import PageCode from "./pages/PageCode";
import Error from "./pages/Error";
import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  const [allData, setAllData] = useState([]);
  const [setEle] = useState([]);
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes basename="/amp">
            <Route path="amp/" element={<Home />} />

            <Route
              path="/amp/results/:content"
              element={<Resume setAllData={setAllData} setEle={setEle} />}
            />

            <Route
              path="/amp/results/:content/:details"
              element={<Detail allData={allData} />}
            />

            <Route
              path="/amp/results/:content/code"
              element={<PageCode setAllData={setAllData} setEle={setEle} />}
            />

            {/* Outras rotas */}

            {/* Error page needs to be last */}
            <Route path="/amp/*" element={<Error />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}
