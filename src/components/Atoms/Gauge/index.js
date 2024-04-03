import React from "react";
import "./styles.css";

const Gauge = ({ percentage }) => {
  const adjustedPercentage = percentage * 10;

  const calculateDashOffset = () => {
    const totalLength = 248;
    return totalLength - (adjustedPercentage / 10 / 10) * totalLength;
  };

  const determineColorClass = () => {
    if (percentage >= 8) {
      return "green";
    } else if (percentage >= 5) {
      return "yellow";
    } else {
      return "red";
    }
  };

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="37 -5 120 100"
        width="200"
        height="170"
      >
        <path
          className="grey"
          d="M55,90 A55,55 0 1,1 140,90"
          style={{ fill: "none" }}
        />
        <path
          className={determineColorClass()}
          d="M55,90 A55,55 0 1,1 140,90"
          style={{
            fill: "none",
            strokeDasharray: 248,
            strokeDashoffset: calculateDashOffset(),
          }}
        />
        <text
          x="97"
          y="60"
          textAnchor="middle"
          fill="#333"
          fontSize="42"
          fontWeight="bold"
          fontFamily="Lato"
        >
          {percentage}
        </text>
        <text
          x="97"
          y="80"
          textAnchor="middle"
          fill="#858585"
          fontSize="8"
          fontFamily="Lato"
        >
          Pontuação
        </text>
      </svg>
    </div>
  );
};

export { Gauge };
