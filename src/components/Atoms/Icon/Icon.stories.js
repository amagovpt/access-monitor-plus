import React from "react";
import { Icon } from ".";

import { icons } from "./selection.json";

export default {
  title: "components/Atoms/Icon",
  component: Icon,
};

export function AllIcons() {
  return (
    <div className="list-icons-ama-container">
      {icons.map((icon, index) => (
        <div key={index}>
          <div className="list-icons-ama-content">
            <Icon name={icon.properties.name} />
            <span style={{ marginTop: 10, fontSize: 13 }}>
              {icon.properties.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
