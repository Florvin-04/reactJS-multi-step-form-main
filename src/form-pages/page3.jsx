import React, { useMemo, useState, useEffect, useContext, useCallback } from "react";
import "./page3.scss";
import "./page-globalStyle.scss";

import { allAddOns } from "../utils/constants";
import { FormContext } from "../App";

function page3() {
  const { formData, setFormData, toggleBiling } = useContext(FormContext);

  const [addOns, setAddOns] = useState(formData.addOns);

  useEffect(() => {
    setAddOns((prev) =>
      prev.map((items) =>
        toggleBiling === "monthly"
          ? { ...items, price: allAddOns[items.id - 1].price }
          : { ...items, price: allAddOns[items.id - 1].price * 10 }
      )
    );
  }, []);

  const getAddOns = (id, e) => {
    const target = e.target;
    const targetID = target.getAttribute("data-id");
    const { name, value } = target;

    const newItem = {
      id: Number(targetID),
      name: name,
      price: Number(value),
    };

    if (target.checked) {
      setAddOns((prevData) => [...prevData, newItem]);
    } else {
      setAddOns((prevData) => prevData.filter((item) => (item.id !== id ? { ...item } : null)));
    }
  };

  useEffect(() => {
    setFormData((prevData) => {
      return {
        ...prevData,
        addOns: addOns,
      };
    });
  }, [addOns]);

  const addOnsList = useMemo(() => {
    return allAddOns.map((item, idx) => {
      const itemPrice = toggleBiling === "monthly" ? item.price : item.price * 10;
      // console.log(itemPrice);

      const result = addOns.findIndex((addons) => addons.id === item.id);

      return (
        <div
          className="input__wrapper"
          key={idx}
        >
          <input
            type="checkbox"
            data-id={item.id}
            name={item.title}
            id={item.title}
            className="addons--input"
            value={itemPrice}
            onChange={(e) => getAddOns(item.id, e)}
            checked={addOns[result] ? true : false}
          />

          <label
            htmlFor={item.title}
            className="addons"
          >
            <div className="addons__details">
              <p className="addons__details--name">{item.title}</p>
              <p className="addons__details--description">{item.description}</p>
            </div>

            <p className="addons--price">{`+$${itemPrice}/${
              toggleBiling === "monthly" ? "mo" : "yr"
            }`}</p>
          </label>
        </div>
      );
    });
  }, [toggleBiling, addOns]);

  return (
    <div className="page">
      <h1 className="page-title">Pick add-ons</h1>
      <p className="page-description">You have the option of monthly or yearly billing.</p>
      <div className="details__wrapper">
        {/* <div className="input__wrapper">
          <input
            type="checkbox"
            name=""
            id="online"
            className="addons--input"
          />

          <label
            htmlFor="online"
            className="addons"
          >
            <div className="addons__details">
              <p className="addons__details--name">Online Services</p>
              <p className="addons__details--description">
                Access to multiplayer games
              </p>
            </div>

            <p className="addons--price">+$10/year</p>
          </label>
        </div> */}
        {addOnsList}
      </div>
    </div>
  );
}

export default page3;
