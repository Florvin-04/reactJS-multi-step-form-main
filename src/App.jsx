import React, { useState, createContext, useEffect } from "react";
import "./App.scss";

import Tabs from "./components/tabs";
import Page1 from "./form-pages/page1";
import Page2 from "./form-pages/page2";
import Page3 from "./form-pages/page3";
import Page4 from "./form-pages/page4";
import ThankYouPage from "./form-pages/thankYouPage";

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
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState(
    JSON.parse(localStorage.getItem("formData")) || initialData
  );

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
    // console.log(formData);
  }, [formData]);

  function validateFields(formData) {
    const errors = {};

    if (formData.name === "") {
      errors.name = "This field is required";
    }
    if (formData.email === "") {
      errors.email = "This field is required";
    }
    if (formData.phone === "") {
      errors.phone = "This field is required";
    }
    return errors;
  }

  function nextPage() {
    console.log(errors);
    console.log(Object.keys(errors).length, submitting);
    if (Object.keys(errors).length === 0 && submitting) {
      setCurrentPage((prev) => prev + 1);
      if (currentPage === 4) {
        alert("thanks");
        setFormData(initialData);
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validateFields(formData));
    setSubmitting(true);
  }

  return (
    <div className="App">
      <main>
        <aside className="header">
          <Tabs />
        </aside>

        <div className="form__wrapper">
          <form
            id="form"
            onSubmit={handleSubmit}
          >
            <FormContext.Provider
              value={{
                formData,
                setFormData,
                toggleBiling,
                setToggleBilling,
                setCurrentPage,
                errors,
              }}
            >
              {currentPage === 1 && <Page1 />}
              {currentPage === 2 && <Page2 />}
              {currentPage === 3 && <Page3 />}
              {currentPage === 4 && <Page4 />}
              {currentPage === 5 && <ThankYouPage />}
            </FormContext.Provider>
          </form>

          <div className="buttons">
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
              onClick={nextPage}
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
