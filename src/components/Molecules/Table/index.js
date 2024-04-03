/* eslint-disable jsx-a11y/anchor-is-valid */
import { Icon } from "../../index";
import { Accordion } from "../../Atoms/Accordion";
import { optionForAccordion } from "../../../pages/Resume/utils";
import "./styles.css";

import { useNavigate } from "react-router-dom";

const TableComponent = ({ data, allData, setAllData, setEle }) => {
  console.log("Dataxc", data);
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
              <span class="visually-hidden">#</span>
            </th>
            <th>Practice found</th>
            <th>Level</th>
            <th>See detail</th>
          </tr>
        </thead>

        <tbody>
          {optionsArray.map((option) => (
            <tr key={option.id}>
              <td className={option?.tdClassName}>
                <Icon name={option.iconName} />
              </td>
              <td>
                <Accordion
                  options={[option]}
                  iconAlignment="left"
                  flush={true}
                />
              </td>
              <td className="middle_col">{option?.lvl}</td>
              <td>
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
