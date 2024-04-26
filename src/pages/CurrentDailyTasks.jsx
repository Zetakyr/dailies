import React, { useState, useEffect } from "react";
import CurrentTask from "../components/CurrentTask";

import { useSelector, useDispatch } from "react-redux";
import { dailySetCurrentTasks, dailyToggleProgress } from "../redux/dailies";

const CurrentDailyTasks = () => {
  const { currentDailies } = useSelector((state) => state.dailies);
  const { dailyPool } = useSelector((state) => state.dailies);
  const dispatch = useDispatch();
  const [progressBar, setProgressBar] = useState(0);

  let currentDailyCount = currentDailies.length;
  let progressCount = 0;
  for (let i = 0; i < currentDailyCount; i++) {
    if (currentDailies[i].progress) {
      progressCount++;
    }
  }

  useEffect(() => {
    setProgressBar(progressCount / currentDailyCount);
  }, [currentDailies]);

  const setDailies = (arr) => {
    arr = [...arr];
    let res = [];
    for (let i = 0; i < Math.min(arr.length, 4); i++) {
      let task = arr[i].task;
      res[i] = JSON.parse(`{"task": "${task}", "progress": false}`);
    }
    dispatch(dailySetCurrentTasks(res));
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const getNewDailies = () => {
    let firstDailies = [...dailyPool[0]];

    if (firstDailies.length < 1) {
      firstDailies = [...dailyPool[1]];
      shuffleArray(firstDailies);
      // firstDailies = [...firstDailies];
    }

    if (firstDailies.length > 0) {
      setDailies(firstDailies);
    }
  };

  // const [currentDailies, setCurrentDailies] = useState(getNewDailies());

  // getNewDailies();

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
      <div className="rc-Child">
        <div className="progress">
          <div
            className="actualProgress"
            style={{ width: `${progressBar * 100}%` }}
          ></div>
        </div>
        <div
          className="resetComplete"
          onClick={() => {
            getNewDailies();
          }}
        ></div>
      </div>

      <div className="tasks">
        {currentDailies.map((item, i) => renderCurrentDailies(item, i))}
      </div>
    </div>
  );
};

export default CurrentDailyTasks;
