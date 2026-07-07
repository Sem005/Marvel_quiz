import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/APP/App";
import reportWebVitals from "./reportWebVitals";
import FirebaseService, { FirebaseContext } from "./components/Firebase";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={new FirebaseService()}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
);

reportWebVitals();
