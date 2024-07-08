import { sumAllValues, sumValuesByKey } from "../../../../pages/Resume/utils";
import { Icon } from "../../../index";
import "./styles.css";
import { useTranslation } from "react-i18next";

export function TableAlternative(data) {
  let sumValueA = sumValuesByKey("A", data?.data?.infoak);
  let sumValueAA = sumValuesByKey("AA", data?.data?.infoak);
  let sumValueAAA = sumValuesByKey("AAA", data?.data?.infoak);

  let allvalues = sumAllValues(data?.data.infoak);

  const { t } = useTranslation();
  return (
    <>
      <div className="mb-4">
        <p className="practices_found">
          <span className="practices_found number_found">
            {data?.data?.metadata?.count_results}
          </span>
          {t("RESULTS.summary.table.title")}
        </p>
      </div>

      <table className="table table-bordereds table-alterantive">
        <caption className="visually-hidden">
          {t("RESULTS.summary.metadata.caption")}
        </caption>
        <thead>
          <tr className="mobile_table">
            <th scope="col" className="text-left border_right">
              <p className="heading_totals">Tipo de prática</p>
            </th>

            <th className="border_right heading_total total_top">Total</th>
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

                  <span className="title">
                    {t("RESULTS.summary.table.labels.ok")}
                  </span>
                </div>
                <div
                  className="overlay overlay_aceptable"
                  style={{ width: `${allvalues.ok}%` }}
                />
              </div>

              {/* MOBILE */}
              <div className="d-flex flex-row justify-content-end mobile_row-container">
                <div className="d-flex flex-column mobile-row">
                  <span>Total</span>
                  <span>{allvalues.ok}</span>
                </div>
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

            <td className="border_right body_text desk_row">{allvalues.ok}</td>
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
                  <span className="title">
                    {t("RESULTS.summary.table.labels.warn")}
                  </span>
                </div>
                <div
                  className="overlay overlay_manual"
                  style={{ width: `${allvalues.war}%` }}
                />
              </div>

              {/* MOBILE */}
              <div className="d-flex flex-row justify-content-end mobile_row-container">
                <div className="d-flex flex-column mobile-row">
                  <span>Total</span>
                  <span>{allvalues.war}</span>
                </div>

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

            <td className="border_right body_text desk_row">{allvalues.war}</td>

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

                  <span className="title">
                    {t("RESULTS.summary.table.labels.err")}
                  </span>
                </div>

                <div
                  className="overlay overlay_no_aceptable"
                  style={{ width: `${allvalues.err}%` }}
                />

                {/* <span className="ammount">{allvalues.err}</span> */}
              </div>

              {/* MOBILE */}

              <div className="d-flex flex-row justify-content-end mobile_row-container">
                <div className="d-flex flex-column mobile-row">
                  <span>Total</span>
                  <span>{allvalues.err}</span>
                </div>
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

            <td className="border_right body_text desk_row">{allvalues.err}</td>
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
            <th scope="row" className="border-bottom-0 border_right  sr-only">
              <span className="heading_totals">Total</span>
            </th>

            <td className="border-bottom-0 border_right border_left heading_total total_bottom">
              {data?.data?.metadata?.count_results}
            </td>

            <td className="border-bottom-0 border_right border_left heading_total total_bottom">
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
