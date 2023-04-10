import React, { useContext } from "react";
import "./thankYouPage.scss";

import thanksIcon from "../../assets/images/icon-thank-you.svg";
import { FormContext } from "../App";

function thankYouPage() {
  const { setCurrentPage } = useContext(FormContext);

  setTimeout(() => {
    setCurrentPage(1);
  }, 5000);

  return (
    <div className="thank-you">
      <img
        src={thanksIcon}
        alt=""
      />
      <h1 className="thanks"> Thank you!</h1>
      <p className="thanks__description1">Thanks for confirmimg your subscription!</p>
      <p className="thanks__description2">
        We hope you have fun using our platform. If you ever need support, please feel free to emial
        us at support@loremgaming.com{" "}
      </p>
    </div>
  );
}

export default thankYouPage;
