import React, { useMemo } from "react";
import "./tabs.scss";

import { steps } from "../utils/constants.js";

function tabs(props) {
  const step = useMemo(() => {
    return steps.map((item, idx) => {
      return (
        <div
          className="step__container"
          key={idx}
        >
          <div className={`step__circle ${props.currentPage == item.step ? "active" : ""}`}>
            <span>{item.step}</span>
          </div>
          <div className="more-info">
            <p className="step">step {item.step}</p>
            <p className="step-title">{item.title}</p>
          </div>
        </div>
      );
    });
  }, [props.currentPage]);

  return (
    <div className="tabs__container">
      {step}
      {""}
    </div>
  );
}

export default tabs;
