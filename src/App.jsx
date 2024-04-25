import { useState } from "react";
import "./app.scss";

import { useSelector } from "react-redux";
import { map } from "lodash";
import Checkbox from "./components/Checkbox";
import Task from "./components/Task";

function App() {
  const [view, setView] = useState("daily");
  const { currentDailies } = useSelector((state) => state.dailies);

  const renderView = () => {
    switch (view) {
      case "daily":
        return (
          <div className="tasks">
            {currentDailies.map((item, i) => renderCurrentDailies(item, i))}
          </div>
        );
      default:
        return (
          <div className="tasks">
            {currentDailies.map((item, i) => renderCurrentDailies(item, i))}
          </div>
        );
    }
  };

  const renderCurrentDailies = (val, i) => {
    return (
      <div className="currentDailyItem" key={val.task}>
        {/* <div className="task">{val.task}</div> */}
        <Task index={i} />
        <div>
          <Checkbox index={i} />
        </div>
      </div>
    );
  };

  console.log(currentDailies);
  return (
    <div className="section">
      <div className="leftContainer">
        <div className="profile"></div>
        <div className="dailyWeekly"></div>
        <div className="dailyWeekly"></div>
      </div>

      <div className="rightContainer">
        <div className="progress"></div>
        {renderView()}
      </div>
    </div>
  );
}

export default App;
