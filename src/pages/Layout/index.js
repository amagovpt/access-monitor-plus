import { Footer, Header } from "../../components";
import "./styles.css";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="main" id="content">
        {children}
      </main>

      <Footer />
    </>
  );
}
