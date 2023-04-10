import React, { useMemo, useContext } from "react";
import "./page1.scss";
import "./page-globalStyle.scss";

import { infoFields } from "../utils/constants";
import { FormContext } from "../App";

import * as yup from "yup";

function page1() {
  const { formData, register, errors, validateInput } = useContext(FormContext);

  const input = useMemo(() => {
    return infoFields.map((item, idx) => {
      return (
        <div
          key={idx}
          className="input__wrapper"
        >
          <label htmlFor={item.name}>
            <p className={`label-title`}>{item.label}</p>
            {errors[item.name] && <p className="error-response">{errors[item.name].message}</p>}
            <input
              className={`input-field  ${errors[item.name]?.message ? "invalid" : ""}`}
              type={item.type}
              placeholder={item.placeholder}
              name={item.name}
              id={item.name}
              {...register(item.name)}
              onChange={(e) => {
                validateInput(item.name, e.target.value);
              }}
            />
          </label>
        </div>
      );
    });
  }, [formData, validateInput]);

  return (
    <div className="page">
      <h1 className="page-title">Personal info</h1>
      <p className="page-description">Please provide your name, email address and phone number</p>
      <div className="details__wrapper">{input}</div>
    </div>
  );
}

export default page1;
