import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";

const DailyTaskPool = () => {
  const [view, setView] = useState("mandatory");
  const { dailyPool } = useSelector((state) => state.dailies);
  const [mandatoryTasks, setMandatoryTasks] = useState(dailyPool[0]);
  const [optionalTasks, setOptionalTasks] = useState(dailyPool[1]);
  const { control, register } = useForm();

  const {
    fields: fieldsMandatory,
    remove: removeMandatory,
    append: appendMandatory,
  } = useFieldArray({ control, name: "mandatories" });

  const {
    fields: fieldsOptional,
    remove: removeOptional,
    append: appendOptional,
    update: updateOptional,
  } = useFieldArray({ control, name: "optionals" });

  useEffect(() => {
    for (let i = 0; i < mandatoryTasks.length; i++) {
      appendMandatory({ task: mandatoryTasks[i].task });
    }

    for (let i = 0; i < optionalTasks.length; i++) {
      appendOptional({ task: optionalTasks[i].task });
    }
  }, []);

  const renderTasks = () => {
    switch (view) {
      case "optional":
        // return <>{optionalTasks.map((item, i) => renderTask(item, i))}</>;
        return (
          <>
            {fieldsOptional.map((field, index) => (
              <input
                className="taskInput"
                key={field.id}
                {...register(`optionals.${index}.value`, {
                  // onBlur: (e) => console.log(e.target.value),
                  onBlur: (e) =>
                    updateOptional(index, { task: e.target.value }),
                })}
                placeholder="Task"
                defaultValue={field.task}
                // onBlur={console.log(field.task)}
              />
            ))}
          </>
        );

      default:
        return (
          <>
            {fieldsMandatory.map((field, index) => (
              <input
                className="taskInput"
                key={field.id}
                {...register(`mandatories.${index}.value`)}
                placeholder="Task"
                defaultValue={field.task}
              />
            ))}
          </>
        );
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
      <div className="tasks center">
        <div className="taskInputs">{renderTasks()}</div>
      </div>
      <div
        className="testButton"
        onClick={() => {
          console.table(fieldsOptional);
        }}
      >
        click me
      </div>
    </div>
  );
};

export default DailyTaskPool;
