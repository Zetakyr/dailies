import React from "react";
import { useState } from "react";

const DailyTaskPool = () => {
  const [view, setView] = useState("mandatory");

  const renderTasks = () => {
    switch (view) {
      case "optional":
        return <></>;

      default:
        return <></>;
    }
  };

  return (
    <div className="rightContainer">
      <div className="rc-Child">
        <div
          className={`mandatoryOptional mandatory ${
            view === "mandatory" ? "currentTab" : ""
          }`}
          onClick={() => {
            setView("mandatory");
          }}
        ></div>
        <div
          className={`mandatoryOptional optional ${
            view === "optional" ? "currentTab" : ""
          }`}
          onClick={() => {
            setView("optional");
          }}
        ></div>
      </div>
      <div className="tasks"></div>
    </div>
  );
};

export default DailyTaskPool;
