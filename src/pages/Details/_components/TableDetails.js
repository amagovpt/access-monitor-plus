import "./styles.css";
import { useTranslation } from "react-i18next"


const renderHTML = (htmlString) => {
  return { __html: htmlString };
};

export function TableDetails({ data }) {
  const {t} = useTranslation()
  return (
    <table className="table1">
      {/*<caption className="visually-hidden"> Result 1 of the practice </caption>*/}
      <caption className="visually-hidden"> {t("ELEMENT_RESULTS.caption", { value: 1})} </caption>
      <tbody>
        {data &&
          data.map((item, index) => (
            <div className="table_container-details">
              <tr key={index}>
                <td rowSpan="4" className="counter">
                  <span>{index + 1}</span>
                </td>
                <th scope="row" className="label">
                  <strong>{t("ELEMENT_RESULTS.result.element")}</strong>
                </th>
                <td className="value">
                  <span className="element">{item?.ele}</span>
                </td>
              </tr>
              <tr key={`${index}-code`}>
                <th scope="row" className="label">
                  <strong>{t("ELEMENT_RESULTS.result.code")}</strong>
                </th>
                <td className="value">
                  <code>{item?.code}</code>
                </td>
              </tr>
              <tr key={`${index}-showCode`}>
                <th scope="row" className="label">
                  <strong>{t("ELEMENT_RESULTS.result.content")}</strong>
                </th>
                <td className="value">
                  <div
                    className="img"
                    dangerouslySetInnerHTML={renderHTML(item.showCode)}
                  />
                </td>
              </tr>
              <tr key={`${index}-pointer`}>
                <th scope="row" className="label">
                  <strong>{t("ELEMENT_RESULTS.result.location")}</strong>
                </th>
                <td className="value">
                  <span className="element">{item?.pointer}</span>
                </td>
              </tr>
            </div>
          ))}
      </tbody>
    </table>
  );
}
