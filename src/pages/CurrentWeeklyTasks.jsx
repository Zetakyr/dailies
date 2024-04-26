import React from "react";
import CurrentTask from "../components/CurrentTask";
import { useSelector, useDispatch } from "react-redux";
import { weeklyToggleProgress } from "../redux/weeklies";

const CurrentWeeklyTasks = () => {
  const { currentWeeklies } = useSelector((state) => state.weeklies);
  const dispatch = useDispatch();

  const toggleTick = (index) => {
    dispatch(weeklyToggleProgress({ index }));
  };

  const renderCurrentWeeklies = (val, i) => {
    return (
      <div className="currentDailyItem" key={val.task}>
        <CurrentTask index={i} task={val.task} />
        <div
          className={`${currentWeeklies[i].progress ? "ticked" : ""} checkbox`}
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
        {currentWeeklies.map((item, i) => renderCurrentWeeklies(item, i))}
      </div>
    </div>
  );
};

export default CurrentWeeklyTasks;
