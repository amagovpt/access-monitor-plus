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
          <tr className="mobile_table">
            <th
              scope="col"
              className="text-left border_right practices_found_container"
            >
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

              {/* MOBILE */}
              <div className="d-flex flex-row justify-content-end mobile_row-container">
                <div className="d-flex flex-column mobile-row">
                  <span>A</span>
                  <span>{data?.data && data?.data?.infoak?.A?.ok}</span>
                </div>

                <div className="d-flex flex-column mobile-row">
                  <span>AA</span>
                  <span>{data?.data && data?.data?.infoak?.AA?.ok}</span>
                </div>

                <div className="d-flex flex-column mobile-row">
                  <span>AAA</span>
                  <span>{data?.data && data?.data?.infoak?.AAA?.ok}</span>
                </div>
              </div>
            </th>

            {/* DESKTOP */}

            <td className="border_right body_text desk_row">
              {data?.data && data?.data?.infoak?.A?.ok}
            </td>
            <td className="border_right body_text desk_row">
              {data?.data && data?.data?.infoak?.AA?.ok}
            </td>
            <td className="border_right body_text desk_row">
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

              {/* MOBILE */}
              <div className="d-flex flex-row justify-content-end mobile_row-container">
                <div className="d-flex flex-column mobile-row">
                  <span>A</span>
                  <span>{data?.data && data?.data?.infoak?.A?.war}</span>
                </div>

                <div className="d-flex flex-column mobile-row">
                  <span>AA</span>
                  <span>{data?.data && data?.data?.infoak?.AA?.war}</span>
                </div>

                <div className="d-flex flex-column mobile-row">
                  <span>AAA</span>
                  <span>{data?.data && data?.data?.infoak?.AAA?.war}</span>
                </div>
              </div>
            </th>

            {/* DESKTOP */}

            <td className="border_right body_text desk_row">
              {data?.data && data?.data?.infoak?.A?.war}
            </td>
            <td className="border_right body_text desk_row">
              {data?.data && data?.data?.infoak?.AA?.war}
            </td>
            <td className="border_right body_text desk_row">
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

              {/* MOBILE */}

              <div className="d-flex flex-row justify-content-end mobile_row-container">
                <div className="d-flex flex-column mobile-row">
                  <span>A</span>
                  <span>{data?.data && data?.data?.infoak?.A?.err}</span>
                </div>

                <div className="d-flex flex-column mobile-row">
                  <span>AA</span>
                  <span>{data?.data && data?.data?.infoak?.AA?.err}</span>
                </div>

                <div className="d-flex flex-column mobile-row">
                  <span>AAA</span>
                  <span>{data?.data && data?.data?.infoak?.AAA?.err}</span>
                </div>
              </div>
            </th>

            {/* DESKTOP */}
            <td className="border_right body_text desk_row">
              {data?.data && data?.data?.infoak?.A?.err}
            </td>
            <td className="border_right body_text desk_row">
              {data?.data && data?.data?.infoak?.AA?.err}
            </td>
            <td className="border_right body_text desk_row">
              {data?.data && data?.data?.infoak?.AAA?.err}
            </td>
          </tr>

          {/* TOTAL */}

          {/* MOBILE */}
          <div className="d-flex flex-row justify-content-end total_mobile mobile_row-container-total">
            <div className="d-flex flex-column mobile-row">
              <span>Total</span>
              <span>{data?.data?.metadata?.count_results}</span>
            </div>

            <div className="d-flex flex-column mobile-row">
              <span>A</span>
              <span>{sumValueA}</span>
            </div>

            <div className="d-flex flex-column mobile-row">
              <span>AA</span>
              <span>{sumValueAA}</span>
            </div>

            <div className="d-flex flex-column mobile-row">
              <span>AAA</span>
              <span>{sumValueAAA}</span>
            </div>
          </div>

          {/* DESK */}
          <tr className="total_bottom-container">
            <th scope="row" className="border-bottom-0 border_right ">
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
