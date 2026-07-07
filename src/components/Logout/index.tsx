import React, { useContext, useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { FirebaseContext } from "../Firebase";
import "react-tooltip/dist/react-tooltip.css";

const Logout = () => {
  const firebase = useContext(FirebaseContext);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) {
      firebase.signOutUser();
    }
  }, [checked, firebase]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="logoutContainer">
      <label className="switch">
        <input onChange={handleChange} type="checkbox" checked={checked} />
        <span
          className="slider round"
          data-tooltip-content="Deconnection"
          id="attributes-basic"
          data-tooltip-place="left"
        ></span>
      </label>
      <Tooltip anchorId="attributes-basic" />
    </div>
  );
};

export default Logout;
