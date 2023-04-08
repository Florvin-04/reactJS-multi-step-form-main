import React, { useMemo, useState, useEffect, useContext } from "react";

import "./page2.scss";
import "./page-globalStyle.scss";
import { plans } from "../utils/constants";
import { FormContext } from "../App";

function page2() {
  const { formData, setFormData, toggleBiling, setToggleBilling } = useContext(FormContext);

  const [planValue, setPlanValue] = useState({
    name: formData.selectedPlan.name,
    price: formData.selectedPlan.price,
    id: formData.selectedPlan.id,
  });

  function changeBilling() {
    toggleBiling === "monthly" ? setToggleBilling("yearly") : setToggleBilling("monthly");
  }

  useEffect(() => {
    setPlanValue((prev) => ({
      ...prev,
      billing: toggleBiling,
      price: toggleBiling === "monthly" ? plans[prev.id - 1].price : prev.price * 10,
    }));
  }, [toggleBiling]);

  function getValue(e) {
    const target = e.target;
    const targetID = target.getAttribute("data-id");
    const { value, id } = target;

    setPlanValue({
      billing: toggleBiling,
      name: id,
      price: value,
      id: Number(targetID),
    });
  }

  useEffect(() => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        selectedPlan: {
          billingType: toggleBiling,
          name: planValue.name,
          price: planValue.price,
          id: planValue.id,
        },
      };
    });
  }, [planValue]);

  const plan = useMemo(() => {
    return plans.map((item, idx) => {
      const yearlyPrice = item.price * 10;
      const monthlyPrice = item.price;

      const checked = formData.selectedPlan.id === item.id;

      return (
        <div
          className="input__wrapper"
          key={idx}
        >
          <input
            type="radio"
            name="plan"
            data-id={item.id}
            id={item.title}
            value={toggleBiling === "monthly" ? monthlyPrice : yearlyPrice}
            onChange={getValue}
            checked={checked}
          />
          <label
            htmlFor={item.title}
            className="label-parent"
          >
            <img
              src={item.icon}
              alt=""
              className="label-image"
            />

            <div className="label__info">
              <p className="label__info--title">{item.title}</p>
              <p className="label__info--price">{`$${
                toggleBiling === "monthly" ? `${monthlyPrice}/mo` : `${yearlyPrice}/yr`
              } `}</p>
            </div>
          </label>
        </div>
      );
    });
  }, [toggleBiling, formData]);

  return (
    <div className="page">
      <h1 className="page-title">Select your plan</h1>
      <p className="page-description">You have the option of monthly or yearly billing.</p>
      <div className="details__wrapper">
        <div className="plans">{plan}</div>

        <div className="billing__type">
          <label
            htmlFor="billing"
            className={`monthly ${toggleBiling === "monthly" ? "active" : ""}`}
          >
            Monthly
          </label>
          <label className="toggle">
            <input
              type="checkbox"
              name="billing"
              id="billing"
              onChange={changeBilling}
              value={toggleBiling}
              checked={toggleBiling === "yearly" ? true : false}
            />
            <span className="circle"></span>
          </label>

          <label
            htmlFor="billing"
            className={`yearly ${toggleBiling === "yearly" ? "active" : ""}`}
          >
            Yearly
          </label>
        </div>
      </div>
    </div>
  );
}

export default page2;
