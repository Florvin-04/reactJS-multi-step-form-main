import { useState } from "react";
import "./App.scss";

import Tabs from "./components/tabs";
import Page1 from "./form-pages/page1";
import Page2 from "./form-pages/page2";

function App() {
  const [cuurentPage, setCurrentPage] = useState(2);

  return (
    <div className="App">
      <main>
        <aside className="header">
          <Tabs />
        </aside>

        <div className="form__wrapper">
          <form id="form">
            {cuurentPage === 1 && <Page1 />}
            {cuurentPage === 2 && <Page2 />}
          </form>

          <div className="buttons mobile">
            <button
              type="button"
              className="prev-btn"
            >
              Go Back
            </button>

            <button
              type="button"
              className="next-btn"
              form="form"
            >
              Next Step
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
