import React, { useState, createContext, useEffect } from "react";
import "./App.scss";

import Tabs from "./components/tabs";
import Page1 from "./form-pages/page1";
import Page2 from "./form-pages/page2";
import Page3 from "./form-pages/page3";
import Page4 from "./form-pages/page4";
import ThankYouPage from "./form-pages/thankYouPage";

// import Page5 from "./form-pages/page5";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const FormContext = createContext(null);

const initialData = {
  name: "",
  email: "",
  phone: "",
  selectedPlan: {
    id: 1,
    billingType: "monthly",
    name: "Arcade",
    price: "9",
  },
  addOns: [],
};

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [toggleBiling, setToggleBilling] = useState("monthly");

  const [formData, setFormData] = useState(
    () => JSON.parse(localStorage.getItem("formData")) || initialData
  );

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
    // console.log(formData);
  }, [formData]);

  const userDataSchema = yup.object().shape({
    name: yup.string().required("Name is a required field."),
    email: yup.string().email("Enter a valid Email").required("Email is a required field."),
    phone: yup
      .string()
      .transform((value) => (Number.isNaN(value) ? "" : value))
      .required("Phone Number is a required field.")
      .min(11, "Invalid Phone Number")
      .test("isNumber", "Accepts Number only", (value) => {
        return /^\d+$/.test(value.toString());
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(userDataSchema),
  });

  useEffect(() => {
    Object.entries(formData).forEach(([key, value]) => {
      setValue(key, value);
    });
  }, [setValue]);

  const validateInput = (fieldName, value) => {
    yup
      .reach(userDataSchema, fieldName)
      .validate(value)
      .then(() => {
        clearErrors(fieldName);
      })
      .catch((err) => {
        setError(fieldName, { type: "manual", message: err.message });
      });
  };

  function submitForm(data) {
    setCurrentPage((prev) => prev + 1);

    if (currentPage === 1) {
      setFormData((prevUserData) => ({
        ...prevUserData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      }));
    }

    if (currentPage === 4) {
      reset();
      setFormData(initialData);
      console.log(formData);
      alert("Data has been Submitted");
    }
  }

  return (
    <div className="App">
      <main>
        <aside className="header">
          <Tabs currentPage={currentPage} />
        </aside>

        <div className="form__wrapper">
          <form
            id="form"
            onSubmit={handleSubmit(submitForm)}
          >
            <FormContext.Provider
              value={{
                formData,
                setFormData,
                toggleBiling,
                setToggleBilling,
                setCurrentPage,
                register,
                errors,
                setError,
                clearErrors,
                userDataSchema,
                validateInput,
              }}
            >
              {currentPage === 1 && <Page1 />}
              {currentPage === 2 && <Page2 />}
              {currentPage === 3 && <Page3 />}
              {currentPage === 4 && <Page4 />}
              {currentPage === 5 && <ThankYouPage />}
              {currentPage === 6 && <Page5 />}
            </FormContext.Provider>
          </form>

          <div className={`buttons ${currentPage === 5 ? "hidden" : ""}`}>
            <button
              type="button"
              className={`prev-btn ${currentPage !== 1 ? "" : "hidden"}`}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Go Back
            </button>

            <button
              type="submit"
              className="next-btn"
              form="form"
              // onClick={nextPage}
            >
              {currentPage === 4 ? "Confirm" : "Next Step"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
