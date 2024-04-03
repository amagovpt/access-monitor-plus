import { sumAllValues, sumValuesByKey } from "../../../../pages/Resume/utils";
import { Icon } from "../../../index";
import "./styles.css";

export function TableAlternative(data) {
  let sumValueA = sumValuesByKey("A", data?.data?.infoak);
  let sumValueAA = sumValuesByKey("AA", data?.data?.infoak);
  let sumValueAAA = sumValuesByKey("AAA", data?.data?.infoak);

  let allvalues = sumAllValues(data?.data.infoak);

  return (
    <>
      <table className="table table-bordereds table-alterantive">
        <caption className="visually-hidden">practices found</caption>
        <thead>
          <tr>
            <th scope="col" className="text-left border_right ">
              <span className="total_practices">
                {data?.data?.metadata?.count_results}
              </span>{" "}
              <span className="practices_found">practices found</span>
            </th>
            <th className="border_right heading_total total_top">A</th>
            <th className="border_right heading_total total_top">AA</th>
            <th className="border_right heading_total total_top">AAA</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th scope="row" className="border_right">
              <div className="aceptable_continer">
                <div className="icon_and_text">
                  <Icon name="AMA-Check-Line" />

                  <span className="title">Aceptable</span>
                </div>
                <div
                  className="overlay overlay_aceptable"
                  style={{ width: `${allvalues.ok}%` }}
                />

                <span className="ammount">{allvalues.ok} </span>
              </div>
            </th>
            <td className="border_right body_text">
              {data?.data && data?.data?.infoak?.A?.ok}
            </td>
            <td className="border_right body_text">
              {" "}
              {data?.data && data?.data?.infoak?.AA?.ok}
            </td>
            <td className="border_right body_text">
              {" "}
              {data?.data && data?.data?.infoak?.AAA?.ok}
            </td>
          </tr>

          <tr>
            <th scope="row" className="border_right">
              <div className="aceptable_continer">
                <div className="icon_and_text">
                  <Icon name="AMA-Middle-Line" />
                  <span className="title">To view manually</span>
                </div>
                <div
                  className="overlay overlay_manual"
                  style={{ width: `${allvalues.war}%` }}
                />

                <span className="ammount">{allvalues.war}</span>
              </div>
            </th>
            <td className="border_right body_text">
              {" "}
              {data?.data && data?.data?.infoak?.A?.war}
            </td>
            <td className="border_right body_text">
              {data?.data && data?.data?.infoak?.AA?.war}
            </td>
            <td className="border_right body_text">
              {data?.data && data?.data?.infoak?.AAA?.war}
            </td>
          </tr>

          <tr>
            <th scope="row" className="border_right">
              <div className="aceptable_continer">
                <div className="icon_and_text">
                  <Icon name="AMA-Wrong-Line" />

                  <span className="title">Non Acceptable</span>
                </div>

                <div
                  className="overlay overlay_no_aceptable"
                  style={{ width: `${allvalues.err}%` }}
                />

                <span className="ammount">{allvalues.err}</span>
              </div>
            </th>
            <td className="border_right body_text">
              {data?.data && data?.data?.infoak?.A?.err}
            </td>
            <td className="border_right body_text">
              {data?.data && data?.data?.infoak?.AA?.err}
            </td>
            <td className="border_right body_text">
              {data?.data && data?.data?.infoak?.AAA?.err}
            </td>
          </tr>

          <tr>
            <th scope="row" className="border-bottom-0 border_right">
              <span class="visually-hidden">Total</span>
            </th>
            <td className="border-bottom-0 border_right heading_total total_bottom">
              {sumValueA}
            </td>
            <td className="border-bottom-0 border_right heading_total total_bottom">
              {sumValueAA}
            </td>
            <td className="border-bottom-0 border_right heading_total total_bottom">
              {sumValueAAA}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
