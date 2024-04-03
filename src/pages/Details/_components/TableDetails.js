import "./styles.css";

const renderHTML = (htmlString) => {
  return { __html: htmlString };
};

export function TableDetails({ data }) {
  console.log("Data", data);
  console.log("Data", data);

  return (
    <table className="table1">
      <caption className="visually-hidden"> Result 1 of the practice </caption>
      <tbody>
        {data &&
          data.map((item, index) => (
            <div className="table_container-details">
              <tr key={index}>
                <td rowSpan="4" className="counter">
                  <span>{index + 1}</span>
                </td>
                <th scope="row" className="label">
                  <strong>Element:</strong>
                </th>
                <td className="value">
                  <span className="element">{item?.ele}</span>
                </td>
              </tr>
              <tr key={`${index}-code`}>
                <th scope="row" className="label">
                  <strong>Code:</strong>
                </th>
                <td className="value">
                  <code>{item?.code}</code>
                </td>
              </tr>
              <tr key={`${index}-showCode`}>
                <th scope="row" className="label">
                  <strong>Content/text:</strong>
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
                  <strong>Location:</strong>
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
