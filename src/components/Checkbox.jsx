import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleProgress } from "../redux/dailies";

const Checkbox = (props) => {
  const { currentDailies } = useSelector((state) => state.dailies);
  const dispatch = useDispatch();

  const toggleTick = () => {
    dispatch(toggleProgress({ index: props.index }));
  };

  return (
    <div
      className={`${
        currentDailies[props.index].progress ? "ticked" : ""
      } checkbox`}
      onClick={toggleTick}
    ></div>
  );
};

export default Checkbox;
