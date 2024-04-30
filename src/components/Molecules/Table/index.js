/* eslint-disable jsx-a11y/anchor-is-valid */
import { Icon } from "../../index";
import { Accordion } from "../../Atoms/Accordion";
import { optionForAccordion } from "../../../pages/Resume/utils";

import "./styles.css";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TableComponent = ({ data, allData, setAllData, setEle }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (!data || !data.results) {
    return;
  }

  function setAllDataResult(ele) {
    setAllData(allData);
    setEle(ele);
    navigate("/detalhe");
  }

  const optionsArray = optionForAccordion(t, data);

  return (
    <>
      <table className="table table_primary">
        <caption className="visually-hidden">
          {t("RESULTS.results.caption")}
        </caption>
        <thead>
          <tr>
            <th colSpan="2" >{t("RESULTS.results.practice")}</th>
            <th className="hide-on-small-screen">{t("RESULTS.results.lvl")}</th>
            <th className="hide-on-small-screen">
              {t("RESULTS.results.details")}
            </th>
          </tr>
        </thead>

        <tbody>
          {optionsArray.map((option) => (
            <tr id={option.id} key={option.id}>
              <td className={option?.tdClassName}>
                <span className="visually-hidden">{t(`RESULTS.results.image_title.${option.iconName}`)}</span>
                <Icon name={option.iconName} />
              </td>
              <td className="mobile-options">
                <Accordion options={[option]} flush={true} id={option.id} />

              <div className="hide_desktop-screen">
                <span>
                  {t("RESULTS.results.lvl")}: {option?.lvl}
                </span>

                  {option.ele && (
                    <button
                      onClick={() => setAllDataResult(option.ele)}
                      className="detail_link"
                      aria-label={t("RESULTS.results.details")}
                    >
                      <Icon name="AMA-Detalhe-Line" />
                    </button>
                  )}
                </div>
              </td>
              <td className="middle_col hide-on-small-screen">{option?.lvl}</td>

            <td
              className={`hide-on-small-screen ${option.ele ? "" : "visually-hidden"}`}
            >
              <button
                onClick={() => setAllDataResult(option.ele && option.ele)}
                className="detail_link"
                aria-label={t("RESULTS.results.details")}
              >
                <Icon name="AMA-Detalhe-Line" />
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
