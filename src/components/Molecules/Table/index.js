import React from "react";

import "./styles.css";

import { Accordion } from "../../Atoms/Accordion";

const TableComponent = () => {
  const options = [
    {
      id: "1",
      title:
        "I found 1 image on the page without the alternative text equivalent.",
      component: (
        <div>
          Check if the alternative text equivalent found in the images provides
          equal information or function as the one performed by the image on the
          page. H37: Using alt attributes on img elements This WCAG 2.1
          technique is related to: Success criteria 1.1.1 (Level A) Notions
          about the SC 1.1.1
        </div>
      ),
    },
  ];
  return (
    <>
      <table className="table table_primary">
        <thead>
          <tr>
            <th></th>
            <th>Practice found</th>
            <th>Level</th>
            <th>See detail</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img
                src="/img/icons/check.svg"
                alt="Check"
                width="36px"
                height="36px"
              />
            </td>
            <td>
              <Accordion options={options} iconAlignment="left" flush={true} />
            </td>
            <td className="middle_col">A</td>
            <td>
              <a href="/#">
                <img src="/img/icons/searchs.svg" alt="" />
              </a>
            </td>
          </tr>

          <tr>
            <td>
              <img
                src="/img/icons/check.svg"
                alt="Check"
                width="36px"
                height="36px"
              />
            </td>
            <td>
              <Accordion options={options} iconAlignment="left" flush={true} />
            </td>
            <td className="middle_col">A</td>
            <td>
              <a href="/detalhe">
                <img src="/img/icons/searchs.svg" alt="" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export { TableComponent };
