/* eslint-disable jsx-a11y/anchor-is-valid */
import { Icon } from "../../index";
import { Accordion } from "../../Atoms/Accordion";
import { optionForAccordion } from "../../../pages/Resume/utils";
import "./styles.css";

import { useNavigate } from "react-router-dom";

const TableComponent = ({ data, allData, setAllData, setEle }) => {
  // console.log("Dataxc", data);
  const navigate = useNavigate();

  if (!data || !data.results) {
    return <div>Dados inválidos ou ausentes.</div>;
  }

  function setAllDataResult(ele) {
    setAllData(allData);
    setEle(ele);
    navigate("/detalhe");
  }

  const optionsArray = optionForAccordion(data);

  return (
    <>
      <table className="table table_primary">
        <caption className="visually-hidden">practices found</caption>
        <thead>
          <tr>
            <th>
              <span className="visually-hidden">#</span>
            </th>
            <th>Practice found</th>
            <th className="hide-on-small-screen">Level</th>
            <th className="hide-on-small-screen">See detail</th>
          </tr>
        </thead>

        <tbody>
          {optionsArray.map((option) => (
            <tr key={option.id}>
              <td className={option?.tdClassName}>
                <Icon name={option.iconName} />
              </td>
              <td className="mobile-options">
                <Accordion
                  options={[option]}
                  iconAlignment="left"
                  flush={true}
                />

                <div className="hide_desktop-screen">
                  <span>Nível: {option?.lvl}</span>

                  <button
                    onClick={() => setAllDataResult(option.ele)}
                    className="detail_link"
                  >
                    <Icon name="AMA-Detalhe-Line" />
                    <span class="visually-hidden">Detalhe</span>
                  </button>
                </div>
              </td>
              <td className="middle_col hide-on-small-screen">{option?.lvl}</td>
              <td className="hide-on-small-screen">
                <button
                  onClick={() => setAllDataResult(option.ele)}
                  className="detail_link"
                >
                  <Icon name="AMA-Detalhe-Line" />
                  <span class="visually-hidden">Detalhe</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export { TableComponent };
