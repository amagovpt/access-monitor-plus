import "./styles/theme.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home/";
import "./i18n";
import Resume from "./pages/Resume";
import Detail from "./pages/Details";
import PageCode from "./pages/PageCode";
import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  const [allData, setAllData] = useState([]);
  const [setEle] = useState([]);
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/results/:content"
              element={<Resume setAllData={setAllData} setEle={setEle} />}
            />

            <Route
              path="/results/:content/:details"
              element={<Detail allData={allData} />}
            />

            <Route
              path="/results/:content/code"
              element={<PageCode setAllData={setAllData} setEle={setEle} />}
            />

            {/* Outras rotas */}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}
