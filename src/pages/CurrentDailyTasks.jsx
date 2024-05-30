import React, { useState, useEffect } from "react";
import CurrentTask from "../components/CurrentTask";
import Modal from "react-modal";

import { useSelector, useDispatch } from "react-redux";
import {
  dailyAddDate,
  dailyEditDate,
  dailySetCurrentTasks,
  dailySetPreviousDate,
  dailyToggleProgress,
  resetMandatoryComplete,
  toggleMandatoryComplete,
} from "../redux/dailies";

const CurrentDailyTasks = () => {
  const { currentDailies } = useSelector((state) => state.dailies);
  const { dailyPool } = useSelector((state) => state.dailies);
  const dispatch = useDispatch();
  const [progressBar, setProgressBar] = useState(0);
  const { mandatoryComplete } = useSelector((state) => state.dailies);
  const { dailyPreviousDate } = useSelector((state) => state.dailies);
  const currentDate = new Date();

  const [showModal, setShowModal] = useState(false);

  // console.log(currentDate.toDateString());

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

  const getMandatoryDailies = () => {
    let firstDailies = [...dailyPool[0]];
    console.log(firstDailies);

    if (firstDailies.length < 1) {
      firstDailies = [...dailyPool[1]];
      console.log(firstDailies);
      shuffleArray(firstDailies);
      // firstDailies = [...firstDailies];
      console.log("no mandatories. Gathering from optional.");
    }

    if (firstDailies.length > 0) {
      setDailies(firstDailies);
    }
  };

  const getOptionalDailies = () => {
    let newDailies = [...dailyPool[1]];
    shuffleArray(newDailies);
    if (newDailies.length > 0) {
      setDailies(newDailies);
    }
  };

  const newDayStart = () => {
    dispatch(resetMandatoryComplete());
    getMandatoryDailies();
  };

  useEffect(() => {
    if (currentDate.toDateString() != dailyPreviousDate) {
      console.log(currentDate.toDateString());
      console.log(dailyPreviousDate);
      dispatch(dailySetPreviousDate(currentDate.toDateString()));
      newDayStart();
    }
  }, []);

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
      <Modal
        appElement={document.getElementById("root")}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        className="modal"
        overlayClassName="overlay"
        isOpen={showModal}
      >
        Are you sure you want to reset today's dailies?
        <div className="modalChoices">
          <button
            className="closeModal button"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancel
          </button>
          <button
            className="dangerChoice"
            onClick={() => {
              newDayStart();
              setShowModal(false);
            }}
          >
            Reset!
          </button>
        </div>
      </Modal>
      <div className="rc-Child">
        <div className="progress">
          <div className="actualProgressContainer">
            <div
              className="actualProgress"
              style={{
                width: `${progressBar * 100}%`,
                backgroundColor: progressBar === 1 ? "rgb(45, 218, 50)" : "",
              }}
            ></div>
          </div>
        </div>
        <div className="resetCompleteContainer">
          <div className="reset" onClick={() => setShowModal(true)}>
            reset
          </div>
          <div
            className={`complete ${progressBar === 1 ? "cCompleted" : ""}`}
            onClick={() => {
              if (progressBar === 1) {
                if (mandatoryComplete) {
                  // getMandatoryDailies();
                  dispatch(
                    dailyEditDate({
                      date: currentDate.toDateString(),
                      status: 2,
                    })
                  );
                  console.log("getting mandatory");
                } else {
                  getOptionalDailies();
                  dispatch(
                    dailyAddDate(
                      JSON.parse(
                        `{"date": "${currentDate.toDateString()}", "status": 1}`
                      )
                    )
                  );
                  console.log("getting optional");
                  dispatch(toggleMandatoryComplete());
                }
                // dispatch(toggleMandatoryComplete());
                console.log(mandatoryComplete);
              } else {
                console.log("unfinished.");
              }
              // getMandatoryDailies();
            }}
          >
            Complete
          </div>
        </div>
      </div>

      <div className="tasks">
        {currentDailies.map((item, i) => renderCurrentDailies(item, i))}
      </div>
    </div>
  );
};

export default CurrentDailyTasks;
