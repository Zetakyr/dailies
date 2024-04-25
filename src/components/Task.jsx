import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editName } from "../redux/dailies";

const Task = (props) => {
  const [isEditting, setIsEditting] = useState(false);
  const { currentDailies } = useSelector((state) => state.dailies);
  const [taskName, setTaskName] = useState(currentDailies[props.index].task);
  const dispatch = useDispatch();

  const renderEdit = () => {
    return isEditting ? (
      <div
        className="editTask"
        onClick={() => {
          setIsEditting(false);
          dispatch(editName({ index: props.index, task: taskName }));
        }}
      >
        Save
      </div>
    ) : (
      <div className="editTask" onClick={() => setIsEditting(true)}>
        Edit
      </div>
    );
  };

  return <div className="task">{currentDailies[props.index].task}</div>;
};

export default Task;
