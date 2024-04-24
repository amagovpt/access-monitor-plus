import React from "react";
import "./styles.css";

export function LoadingComponent() {
  return (
    <div className="loadingContainer">
      <div className="text_container">
        <span>A carregar...</span>
      </div>
      <div className="loader">
        {[...Array(9)].map((_, index) => (
          <div
            key={index}
            className="dot"
            style={{ animationDelay: `${index * 0.4}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
}
