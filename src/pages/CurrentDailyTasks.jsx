import React from "react";
import CurrentTask from "../components/CurrentTask";

import { useSelector, useDispatch } from "react-redux";
import { dailyToggleProgress } from "../redux/dailies";

const CurrentDailyTasks = () => {
  const { currentDailies } = useSelector((state) => state.dailies);
  const dispatch = useDispatch();

  const toggleTick = (index) => {
    dispatch(dailyToggleProgress({ index }));
  };

  const renderCurrentDailies = (val, i) => {
    return (
      <div className="currentDailyItem" key={val.task}>
        <CurrentTask index={i} task={val.task} />
        <div
          className={`${currentDailies[i].progress ? "ticked" : ""} checkbox`}
          onClick={() => {
            toggleTick(i);
          }}
        ></div>
      </div>
    );
  };

  return (
    <div className="rightContainer">
      <div className="progress"></div>
      <div className="tasks">
        {currentDailies.map((item, i) => renderCurrentDailies(item, i))}
      </div>
    </div>
  );
};

export default CurrentDailyTasks;
