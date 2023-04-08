import React, { useContext, useEffect, useMemo, useState } from "react";
import "./page-globalStyle.scss";
import "./page4.scss";

import { FormContext } from "../App";

function page4() {
  const { formData, setCurrentPage, toggleBiling } = useContext(FormContext);
  // const [total, setTotal] = useState(0);

  const toggle = toggleBiling === "monthly" ? "mo" : "yr";

  const addOnsList = useMemo(() => {
    return formData.addOns.map((item) => {
      return (
        <div
          className="chosen__addons"
          key={item.id}
        >
          <p className="chosen__addons--name">{item.name}</p>
          <p className="chosen__addons--price">{`+$${item.price}/${toggle}`}</p>
        </div>
      );
    });
  }, [formData]);

  function totalAddOnsPrices() {
    let totals = 0;
    if (formData.addOns.length > 0) {
      formData.addOns.map((item) => {
        totals += item.price;
      });
    }
    return totals;
  }

  return (
    <div className="page">
      <h1 className="page-title">Finishing up</h1>
      <p className="page-description">Double-check everything looks OK before confirming</p>
      <div className="details__wrapper">
        <div className="check-out__wrapper">
          <div className="billing__plan">
            <div className="chosen">
              <p className="chosen--plan">{`${formData.selectedPlan.name} (${
                toggleBiling === "monthly" ? "Monthly" : "Yearly"
              })`}</p>
              <button
                className="change__plan"
                type="button"
                onClick={() => setCurrentPage(2)}
              >
                Change
              </button>
            </div>
            <p className="billing__plan--price">{`$${formData.selectedPlan.price}/${toggle}`}</p>
          </div>
          {addOnsList}
          {/* <div className="chosen__addons">
            <p className="chosen__addons--name">Online Services</p>
            <p className="chosen__addons--price">+$1/mo</p>
          </div>
          <div className="chosen__addons">
            <p className="chosen__addons--name">Online Services</p>
            <p className="chosen__addons--price">+$1/mo</p>
          </div>
           */}
        </div>

        <div className="total">
          <p className="total--name">
            Total {`(per ${toggleBiling === "monthly" ? "month" : "year"})`}
          </p>
          <p className="total--price">{`+$${
            totalAddOnsPrices() + formData.selectedPlan.price
          }/${toggle}`}</p>
        </div>
      </div>
    </div>
  );
}

export default page4;
