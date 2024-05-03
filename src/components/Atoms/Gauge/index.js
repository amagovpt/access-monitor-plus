import React, { useState, useEffect } from "react";
import "./styles.css";
import { useTranslation } from "react-i18next";

const Gauge = ({ percentage }) => {
  const { t } = useTranslation();
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    if (percentage) {
      setAnimatedPercentage(percentage);
    } else {
      const interval = setInterval(() => {
        setAnimatedPercentage((prevPercentage) => {
          if (prevPercentage < 100) {
            return prevPercentage + 1;
          } else {
            clearInterval(interval);
            return 100;
          }
        });
      }, 20);
    }
  }, [percentage]);

  const adjustedPercentage = animatedPercentage * 10;

  const calculateDashOffset = () => {
    const totalLength = 248;
    return totalLength - (adjustedPercentage / 10 / 10) * totalLength;
  };

  const determineColorClass = () => {
    if (animatedPercentage >= 8) {
      return "green";
    } else if (animatedPercentage >= 5) {
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
        role="img"
      >
        <title>{t("RESULTS.summary.gauge.title", {value: animatedPercentage})}</title>
        <path
          className="grey"
          d="M55,90 A55,55 0 1,1 140,90"
          style={{ fill: "none" }}
        />
        <path
          className={`animated ${determineColorClass()}`}
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
          {animatedPercentage}
        </text>
        <text
          x="97"
          y="80"
          textAnchor="middle"
          fill="#858585"
          fontSize="8"
          fontFamily="Lato"
        >
          {t("RESULTS.summary.score")}
        </text>
      </svg>
    </div>
  );
};

export { Gauge };
