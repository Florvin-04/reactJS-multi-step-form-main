import React, { useMemo, useState, useContext, useEffect } from "react";
import "./page1.scss";
import "./page-globalStyle.scss";

import { infoFields } from "../utils/constants";
import { FormContext } from "../App";

function page1() {
  const { setFormData, formData, errors } = useContext(FormContext);

  function getUserData(e) {
    const { value, name } = e.target;

    if (name === "phone" && isNaN(value)) return;

    setFormData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  }

  const input = useMemo(() => {
    return infoFields.map((item, idx) => {
      console.log(errors[item.name]);
      return (
        <div
          key={idx}
          className="input__wrapper"
        >
          <label htmlFor={item.name}>
            <p className="label-title">{item.label}</p>
            {errors[item.name] && <p className="error-response">{errors[item.name]}</p>}
            <input
              className="input-field"
              type={item.type}
              placeholder={item.placeholder}
              name={item.name}
              id={item.name}
              onChange={getUserData}
              value={formData[item.name]}
              // required
            />
          </label>
        </div>
      );
    });
  }, [formData, errors]);

  return (
    <div className="page">
      <h1 className="page-title">Personal info</h1>
      <p className="page-description">Please provide your name, email address and phone number</p>
      <div className="details__wrapper">{input}</div>
    </div>
  );
}

export default page1;
