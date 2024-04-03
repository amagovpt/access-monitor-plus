import { Icon } from "../../Atoms/Icon";

import "./styles.css";

export function Footer() {
  return (
    <>
      <footer className="footer">
        <div id="back-to-top" className="back-to-top">
          <button id="#back-to-topo-button">
            <span class="visually-hidden">Voltar ao Topo</span>
            <span>
              <Icon name="AMA-SetadoisoficialCima-Line" />
            </span>
          </button>
        </div>

        <div className="col-sm-12 col-8">
          <nav aria-label="Menu de conformidade do acessibilidade.gov.pt">
            <ul className="d-sm-flex d-block justify-content-center p-3">
              <li className="d-flex links">
                <a href="/acessibilidade">Acessibilidade</a>
              </li>
              <li className="d-flex links">
                <a href="/termos-e-condicoes/">Termos e Condições</a>
              </li>
              <li className="d-flex links">
                <a
                  target="_blank"
                  href="https://www.ama.gov.pt/web/agencia-para-a-modernizacao-administrativa/politica-de-privacidade"
                  rel="noopener noreferrer"
                >
                  Política de Privacidade
                </a>
              </li>
              <li className="d-flex links">
                <a
                  target="_blank"
                  href="https://amagovpt.github.io/kit-selo/"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li className="d-flex links">
                <a target="_blank" href="/glossario/" rel="noopener noreferrer">
                  Glossário
                </a>
              </li>
              <li className="d-flex links">
                <a href="/opcoes-de-visualizacao/">Opções de Visualização</a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="col-sm-12 d-flex justify-content-center">
          <nav
            className="d-inline-flex"
            aria-label="Proprietário e co-financiadores do acessibilidade.gov.pt"
          >
            <ul className="d-sm-flex justify-content-center d-block">
              <li className="d-inline-flex justify-content-center">
                <img
                  id="republica_portuguesa"
                  src="/img/republica_portuguesa.png"
                  alt="República Portuguesa"
                />
              </li>
              <li className="d-inline-flex justify-content-center">
                <img
                  id="ama_img"
                  src="/img/ama-modernizacao_administrativa.png"
                  alt="AMA – Agência para a Modernização Administrativa I.P."
                />
              </li>
              <li className="d-inline-flex justify-content-center">
                <img
                  id="compete_2020"
                  src="/img/compete_2020.png"
                  alt="COMPETE 2020 – Programa Operacional Competitividade e Internacionalização"
                />
              </li>
              <li className="d-inline-flex justify-content-center">
                <img
                  id="uniao_europeia"
                  src="/img/UE-uniao_europeia.png"
                  alt="União Europeia – Fundo Europeu de Desenvolvimento Regional"
                />
              </li>
              <li className="d-inline-flex justify-content-center">
                <img
                  id="portugal_2020"
                  src="/img/portugal_2020.png"
                  alt="Portugal 2020"
                />
              </li>
            </ul>
          </nav>
          <div className="d-sm-flex d-none selo_large">
            <a
              className="position-relative"
              href="https://selo.acessibilidade.gov.pt/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">hiperligação externa</span>
              <img
                src="/img/selo.png"
                alt="Selo Ouro de Usabilidade e Acessibilidade"
              />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
