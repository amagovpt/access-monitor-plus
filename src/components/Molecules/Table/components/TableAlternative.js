import "./styles.css";

export function TableAlternative() {
  return (
    <>
      <table className="table table-bordereds table-alterantive">
        <thead>
          <tr>
            <th scope="col" className="text-left border_right ">
              <span className="total_practices">33</span>{" "}
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
                  <img src="/img/icons/check.svg" alt="" />
                  <span className="title">Aceptable</span>
                </div>
                <div
                  className="overlay overlay_aceptable"
                  style={{ width: "1%" }}
                />

                <span className="ammount"> 24</span>
              </div>
            </th>
            <td className="border_right body_text">14</td>
            <td className="border_right body_text">10</td>
            <td className="border_right body_text">0</td>
          </tr>

          <tr>
            <th scope="row" className="border_right">
              <div className="aceptable_continer">
                <div className="icon_and_text">
                  <img src="/img/icons/warning.svg" alt="" />
                  <span className="title">To view manually</span>
                </div>
                <div
                  className="overlay overlay_manual"
                  style={{ width: "10%" }}
                />

                <span className="ammount">7</span>
              </div>
            </th>
            <td className="border_right body_text">4</td>
            <td className="border_right body_text">0</td>
            <td className="border_right body_text">3</td>
          </tr>

          <tr>
            <th scope="row" className="border_right">
              <div className="aceptable_continer">
                <div className="icon_and_text">
                  <img src="/img/icons/x.svg" alt="" />

                  <span className="title">Non Acceptable</span>
                </div>

                <div
                  className="overlay overlay_no_aceptable"
                  style={{ width: "10%" }}
                />

                <span className="ammount">2</span>
              </div>
            </th>
            <td className="border_right body_text">1</td>
            <td className="border_right body_text">0</td>
            <td className="border_right body_text">1</td>
          </tr>

          <tr>
            <th scope="row" className="border-bottom-0 border_right"></th>
            <td className="border-bottom-0 border_right heading_total total_bottom">
              19
            </td>
            <td className="border-bottom-0 border_right heading_total total_bottom">
              10
            </td>
            <td className="border-bottom-0 border_right heading_total total_bottom">
              4
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
